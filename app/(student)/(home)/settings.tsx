import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import {  StyleSheet, View, Text,Image, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import {decode} from 'base64-arraybuffer';
import { useProfilePhoto } from "@/api/profile/Profile";
import NewButton from "@/components/NewButton";
import { TextInput } from "react-native-paper";
import { useQueryClient } from "@tanstack/react-query";
import { Ionicons } from "@expo/vector-icons";

type Profile = {
  full_name: string;
  username: string;
  group: string;
  avatar_url?:string;
};

const defaultImage = "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg";

export default function ProfileScreen() {
  const {session, loading} = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [image, setImage] = useState<string | null>(null);

  const { data: imageUrl, isLoading } = useProfilePhoto(session?.user.id);
  
  const router = useRouter();
  const queryClient = useQueryClient();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      const img = result.assets[0];
      const localUri = img.uri;
      
      setImage(localUri); 
      
      const imagePath = await uploadProfilePhoto(localUri);
      console.log("Image path is", imagePath);

      if (imagePath) {
        const { error } = await supabase
          .from("profiles")
          .update({ avatar_url: imagePath })
          .eq("id", session!.user.id);

        if (error) {
          console.error("Failed to update avatar_url:", error.message);
        } 
        else {
          console.log("avatar_url updated successfully!");
          queryClient.invalidateQueries({
            queryKey: ['profile-photo', session!.user.id],
          });
        }
      }
    }
  };


  const uploadProfilePhoto = async (uri: string) => {
    if (!uri.startsWith("file://")) return;

    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const fileName = uri.split('/').pop();
    const filePath = `${session!.user.id}/${fileName}`;
    const ext = fileName?.split('.').pop()?.toLowerCase();
    const contentType = ext === 'png' ? 'image/png' : 'image/jpeg';

    try {
      const { data, error } = await supabase.storage
        .from("profile-photos")
        .upload(filePath, decode(base64), { contentType });

      if (error) console.log("Upload error:", error);
      else console.log("Upload data:", data);

      return data?.path;
    } catch (e) {
      console.log("Upload exception:", e);
      return null;
    }
  };



  useEffect(() => {
    const fetchProfile = async () => {
      if (!session) return;
      const { data, error } = await supabase
        .from("profiles")
        .select("username, full_name, group, avatar_url")
        .eq("id", session.user.id)
        .single();

      if (error) {
        console.log("Error fetching profile:", error.message);
      } else {
        setProfile(data);
        if (data.avatar_url) {
          const { data: publicUrl } = supabase.storage.from("profile-photos").getPublicUrl(data.avatar_url);
          setImage(publicUrl.publicUrl);
        }
      }
    };

    fetchProfile();
  }, [session]);

  return (
    <View style={styles.container}>

      <View style={styles.profileRow}>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={() => {
            if (imageUrl) {
              router.push({
                pathname: "/(student)/(misc)/showImage",
                params: { url: imageUrl },
              });
            }
          }}>
            <Image
              source={{ uri: imageUrl }}
              style={styles.profilePhoto}
            />
          </TouchableOpacity>
          <NewButton title="Select image" onPress={pickImage} />
        </View>
        <View>
          {session && profile ? (
            <>
              {/* <Text>Email: {session.user.email}</Text> */}
              <Text>Role: {profile.group}</Text>
              <Text>Name: {profile.full_name}</Text>
              <Text>Username: {profile.username}</Text>
            </>
          ) : (
            <Text>Loading profile...</Text>
          )}
        </View>
      </View>


      {/* <View>
        <TextInput
        placeholder="Enter your e-mail address"
        mode="outlined"
        style={styles.input}
        label="Email"
        outlineStyle={{ borderWidth: 2 }}
        theme={{roundness: 10, 
          colors: {
            primary: "black",
            outline: "black",
          },
        }}
      />
      </View> */}

      <View style={{backgroundColor: "white", borderRadius: 10, marginVertical: 5, }}>
        <Text style={{borderBottomWidth: 1,padding: 7,borderColor: 'grey', fontSize: 17, fontWeight:'bold'}}>App Info</Text>
        <Text style={{borderBottomWidth: 1,padding: 7,borderColor: 'grey', fontSize: 15,}}>Version 1.0.0</Text>
        <View style={{flexDirection:'row' , }}>
          <Text style={{borderBottomWidth: 1,padding: 7,borderColor: 'grey', fontSize: 15,}}>Terms and Conditions</Text>
          <Ionicons name="chevron-forward" size={16} color="#aaa" />
        </View>
        <Text style={{padding: 7, fontSize: 15,}}>Privacy Policy</Text>
      </View>

      <TouchableOpacity onPress={async () => {
            const userId = session?.user.id; 
            const { error } = await supabase.auth.signOut();
            if (error) {
              Toast.show({
                type: 'error', // 'success' | 'error' | 'info'
                text1: 'Could not log out',
                position: 'bottom', // or 'bottom'
                visibilityTime: 2000
              });
            } else {
              console.log("Logged out");
              router.replace("/(auth)/sign-in");
              Toast.show({
                type: 'success', // 'success' | 'error' | 'info'
                text1: 'Log out successful',
                position: 'bottom', // or 'bottom'
                visibilityTime: 1500
              });
            }
          }} activeOpacity={0.7}>
        <View style={{backgroundColor: "white", padding:10,borderRadius: 10, marginVertical: 10,}}>
          <Text style={{fontWeight: 'normal', fontSize: 17,color: 'red'}}>Logout</Text>
        </View>
      </TouchableOpacity>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: "#B9D9EB",
  },
  imageContainer: {
    alignItems: 'center',
    padding: 10,
    marginRight: 5,
    borderRightWidth:2,
    borderColor: 'grey'
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  profilePhoto: {
    borderRadius: 100,
    width: '45%',
    aspectRatio: 1,
    borderWidth: 3,
    borderColor: 'black',
  },
  link: {
    color: 'blue',
    paddingTop: 20,
    fontWeight: 'bold'
  },
  input: {
    marginBottom: 25,
    backgroundColor: '#E1EBEE',
    textDecorationColor: 'none',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 0, // optional: add spacing between image and text
    flexWrap: 'wrap', // so text moves below if needed
    borderWidth: 2,
    borderColor: 'grey',
    borderRadius: 15,
    backgroundColor: 'white',
    marginBottom: 5,
  },

});