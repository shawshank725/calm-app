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

  const navigation = useNavigation();
  const router = useRouter();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      const img = result.assets[0];
      setImage(img.uri); 
    }

    const imagePath = await uploadProfilePhoto();
    console.log("Image path is ", imagePath);

    if (imagePath) {
      const { error } = await supabase
        .from("profiles")
        .update({ avatar_url: imagePath })
        .eq("id", session!.user.id); // session!.user.id is your current user's ID

      if (error) {
        console.error("Failed to update avatar_url:", error.message);
      } else {
        console.log("avatar_url updated successfully!");
      }
    }

  }

  const uploadProfilePhoto = async () => {
    if (!image?.startsWith("file://")){
      return;
    }
    const base64 = await FileSystem.readAsStringAsync(image, {encoding: 'base64',});
    const fileName = image.split('/').pop();
    const filePath = `${session!.user.id}/${fileName}`;

    const ext = fileName?.split('.').pop()?.toLowerCase();
    const contentType = ext === 'png' ? 'image/png' : 'image/jpeg';

    try {
      const {data, error} = await supabase.storage.from("profile-photos").upload(filePath, decode(base64), {contentType});
      console.log("printing data - ", data);
      console.log("printing error - ", error);
      
      
      if (data){
        console.log(data);
        console.log("bro error - ", error);
        console.log("bro ",data.path);
        return data.path;
      }
    }
    catch (error){
      console.log("reporting error from catch block - " + error);
    }
  }


  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Profile',
      headerRight: () => (
        <TouchableOpacity onPress={async () => {
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
      <View style={styles.imageContainer}>
        <Image
          source={{uri: image || defaultImage}}
          style={styles.profilePhoto}
        />
        <Text onPress={pickImage} style={styles.link}>Select profile photo</Text>
      </View>
      {session && profile ? (
        <>
          <Text>Email: {session.user.email}</Text>
          <Text>Role: {profile.group}</Text>
          <Text>Full Name: {profile.full_name}</Text>
          <Text>Username: {profile.username}</Text>
        </>
      ) : (
        <Text>Loading profile...</Text>
      )}
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
    padding: 20,
    flex: 1,
    backgroundColor: "#B9D9EB",
  },
  imageContainer: {
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  profilePhoto: {
    borderRadius: 100,
    width: '50%',
    aspectRatio: 1,
    borderWidth: 3,
    borderColor: 'black',
  },
  link: {
    color: 'blue',
    paddingTop: 20,
    fontWeight: 'bold'
  }
});