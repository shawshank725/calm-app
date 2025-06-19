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
  
  const navigation = useNavigation();
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


  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Settings',
      headerRight: () => (
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
          }}>
          <MaterialIcons
          name="logout" // <- icon name
          size={28}
          color="black"
          style={{ marginRight: 16 }}
        />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

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
                pathname: "/showImage",
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


      <View>
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
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: "#B9D9EB",
  },
  imageContainer: {
    alignItems: 'center',
    padding: 0,
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
    padding: 10,
    borderColor: 'grey',
    borderRadius: 15,
  },

});