import getAllUsernames, { useProfile, useProfilePhoto, useSaveProfileChanges } from '@/api/profile/Profile';
import { router, useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Alert } from 'react-native';
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import Toast from "react-native-toast-message";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import {decode} from 'base64-arraybuffer';
import NewButton from "@/components/NewButton";
import { useQueryClient } from "@tanstack/react-query";
import { TextInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const ProfileEditor = () => {
  const [dataLoading, setDataLoading] = useState(true);
  const {session, loading} = useAuth();
  const { data: profile, isLoading: profileLoading } = useProfile(session?.user.id);
  const [image, setImage] = useState<string | null>(null);
  const { data: imageUrl, isLoading } = useProfilePhoto(session?.user.id);
  
  //setters for user details
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");

  const { mutate : saveProfileChanges, isPending} = useSaveProfileChanges();
  
  // use effect for getting profile details
  useEffect(() => {
    if (profile) {
      setUsername(profile.username || "");
      setFullName(profile.full_name || "");
    }
  }, [profile]);
  const router = useRouter();
  const queryClient = useQueryClient();

  // pick image code here --------------------
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
          Toast.show({ type: 'success', text1: 'Profile photo changed successfully!',position: 'bottom' });

        }
      }
    }
  };

  // upload the profile photo code here ------------------------
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

  // remove image code here 
  const removeImage = async() => {
    if (!session?.user.id || !imageUrl) return;

    try {
      // 1. Extract just the file path from the Supabase URL (if it's a Supabase-hosted image)
      const { data: { publicUrl } } = supabase
        .storage
        .from("profile-photos")
        .getPublicUrl("");

      const isSupabaseImage = imageUrl.startsWith(publicUrl);
      const path = isSupabaseImage ? imageUrl.replace(publicUrl, "") : null;

      // 2. Delete image from Supabase storage only if it's stored there
      if (path) {
        const { error: deleteError } = await supabase
          .storage
          .from("profile-photos")
          .remove([path]);

        if (deleteError) {
          Toast.show({ type: 'error', text1: 'Failed to delete image.',position: 'bottom' });
          return;
        }
      }

      // 3. Set avatar_url to null in DB
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: null })
        .eq("id", session.user.id);

      if (updateError) {
        Toast.show({ type: 'error', text1: 'Failed to update profile.' ,position: 'bottom'});
      } else {
        queryClient.invalidateQueries({
          queryKey: ['profile-photo', session.user.id],
        });
        setImage(null); // Reset local image state if needed
        Toast.show({ type: 'success', text1: 'Profile photo removed!',position: 'bottom' });
      }

    } catch (err) {
      Toast.show({ type: 'error', text1: 'Something went wrong.',position: 'bottom' });
    }
  }
  
  // show the activity indicator timer here -------------------
  useEffect(() => {
    const timer = setTimeout(() => { setDataLoading(false); }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // code for saving the changes made to the profile -------------------------------
  const handleSave = async () => {
    if (!session?.user?.id) return;
    const allUsernames = await getAllUsernames();

    const otherUsernames = allUsernames.filter(name => name !== profile?.username);

    if (profile?.username === username && profile?.full_name === fullName) {
      Alert.alert("No changes made", "You haven't made any changes.");
      return;
    }

    if (otherUsernames.includes(username)) {
      Alert.alert("Username taken", "This username is already taken.");
      return;
    }

    // Proceed with saving changes
    saveProfileChanges({
      id: session.user.id,
      username,
      full_name: fullName,
    });

    router.navigate("/(student)/(home)/settings");
  };

  
  // return view if loading here -----------------------------
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  // return the view if loading is done -------------------------
  return (
    <View style={styles.normal}>
      <View style={profileStyles.profilePhotoContainer}>
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
              style={profileStyles.profilePhoto}
            />
          </TouchableOpacity>
          <View style={profileStyles.buttonContainer}>
            <NewButton title="Select image" onPress={pickImage} />
            <NewButton title="Remove image" onPress={removeImage} />
          </View>
      </View>

      <View style={textBoxStyles.usernameContainer}>
        <Text style={textBoxStyles.heading}>Change Username and name</Text>
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Enter your username"
          mode="outlined"
          style={textBoxStyles.input}
          label="Username"
          outlineStyle={{ borderWidth: 2 }}
          theme={{roundness: 10, 
            colors: {
              primary: "black",
              outline: "black",
            },
          }}
        />

        <TextInput
          value={fullName}
          onChangeText={setFullName}
          placeholder="Enter your name"
          mode="outlined"
          style={textBoxStyles.input}
          label="Name"
          outlineStyle={{ borderWidth: 2 }}
          theme={{roundness: 10, 
            colors: {
              primary: "black",
              outline: "black",
            },
          }}
        />
        <View style={{alignSelf: 'center'}}>
          <NewButton title='Save Changes' onPress={() => {handleSave(); }}/>
        </View>
      </View>
      
      <TouchableOpacity onPress={ () => {router.navigate("/(student)/(misc)/password")}} activeOpacity={0.7}>
        <View style={{backgroundColor: 'white', flexDirection: 'row', borderRadius: 10, padding: 10,}}>
          <Ionicons name="lock-closed" size={20} color="gray" style={{paddingRight: 5,}}/>
          <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={appInfoStyles.warningText}>Change Password</Text>
            <Ionicons name="chevron-forward" size={24} color="gray" />
          </View>
        </View>
      </TouchableOpacity> 
      
    </View>
  );
};


const appInfoStyles = StyleSheet.create({
  warningText: {
    fontWeight: 'normal', 
    fontSize: 17,
    color: 'red'
  },
  singleItems: {
    backgroundColor: "white", 
    padding:10,
    borderRadius: 10, 
    marginTop: 10, 
  },
})

const textBoxStyles = StyleSheet.create({
  input: {
    marginBottom: 10,
    backgroundColor: '#E1EBEE',
    textDecorationColor: 'none',
  },
  usernameContainer: {
    backgroundColor: 'white', 
    padding: 10, 
    marginVertical: 10, 
    borderRadius: 10,
  },
  heading: {
    fontWeight: 'bold', 
    fontSize: 20,
    marginBottom: 10
  },
});

const profileStyles = StyleSheet.create({
  profilePhoto: {
    width: 100,
    height: 100,
    margin: 10,  
    borderRadius: 50,
  },
  profilePhotoContainer: {
    backgroundColor: 'white', 
    justifyContent: 'center', 
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexGrow: 1,
    gap: 10, 
  }
});

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  normal: {
    flex: 1,
    padding: 20,
    backgroundColor: 'lightgreen',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
});

export default ProfileEditor;