import getAllUsernames, { useProfile, useProfilePhoto, useSaveProfileChanges } from '@/api/profile/Profile';
import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
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
import { useAppTheme } from '@/constants/themes/ThemeManager';

const ProfileEditor = () => {
  const [dataLoading, setDataLoading] = useState(true);
  const {session, loading} = useAuth();
  const { data: profile, isLoading: profileLoading } = useProfile(session?.user.id);
  const [image, setImage] = useState<string | null>(null);
  const { data: imageUrl, isLoading } = useProfilePhoto(session?.user.id);
  
  const {styles} = useAppTheme();
  const screensStyles = styles.ProfileScreen;

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

  if (loading) {
    return (
      <View style={screensStyles.centered}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={screensStyles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  // return the view if loading is done -------------------------
  return (
    <View style={screensStyles.normal}>
      <View style={screensStyles.profilePhotoContainer}>
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
              style={screensStyles.profilePhoto}
            />
          </TouchableOpacity>
          <View style={screensStyles.buttonContainer}>
            <NewButton title="Select image" onPress={pickImage} />
            <NewButton title="Remove image" onPress={removeImage} />
          </View>
      </View>

      <View style={screensStyles.usernameContainer}>
        <Text style={screensStyles.heading}>Change Username and name</Text>
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Enter your username"
          mode="outlined"
          style={screensStyles.input}
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
          style={screensStyles.input}
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
        <View style={screensStyles.changePasswordContainer}>
          <Ionicons name="lock-closed" size={20} color="gray" style={{paddingRight: 5,}}/>
          <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={screensStyles.warningText}>Change Password</Text>
            <Ionicons name="chevron-forward" size={24} color="gray" />
          </View>
        </View>
      </TouchableOpacity> 
      
    </View>
  );
};


export default ProfileEditor;