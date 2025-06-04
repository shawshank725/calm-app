import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import {  StyleSheet, View, Text,Image, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

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

    console.log("result  ------- ", result);

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const img = result.assets[0];
      setImage(img.uri); 
      const base64 = await FileSystem.readAsStringAsync(img.uri, {encoding: 'base64'});
      const uri = img.uri;

      const ext = uri.split('.').pop()?.toLowerCase() || 'jpg'; 

      let contentType = 'image/jpeg'; 
      if (ext === 'png') {
        contentType = 'image/png';
      } else if (ext === 'jpg' || ext === 'jpeg') {
        contentType = 'image/jpeg';
      }
      const filePath = `${session!.user.id}/${Date.now()}.${ext}`;
      console.log(session!.user.id);
      const response = await fetch(img.uri);
      const blob = await response.blob();

      console.log("Image picked:", img.uri);
      console.log("File path:", filePath);
      console.log("Content type:", contentType);

      const {data, error} = await supabase.storage.from("avatars").upload(filePath, blob, {
          contentType, upsert: true, });
      
      console.log("Upload result:", { data, error });
    }
  };
  
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
        .select("username, full_name, group")
        .eq("id", session.user.id)
        .single();

      if (error) {
        console.log("Error fetching profile:", error.message);
      } else {
        setProfile(data);
      }
    };

    fetchProfile();
  }, [session]);

  return (

    <View style={{ padding: 20 }}>
      <View style={styles.container}>
        <Image
          source={{uri: image || defaultImage}}
          style={styles.profilePhoto}
        />
        <Text onPress={pickImage} style={styles.link}>Select profile photo</Text>
      </View>
      {session && profile ? (
        <>
          <Text>Email: {session.user.email}</Text>
          <Text>Full Name: {profile.full_name}</Text>
          <Text>Username: {profile.username}</Text>
          <Text>Role: {profile.group}</Text>
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