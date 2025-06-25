import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import {  useRouter } from "expo-router";
import { useState } from "react";
import {  StyleSheet, View, Text,Image, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
import { useProfilePhoto } from "@/api/profile/Profile";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

type Profile = {
  full_name: string;
  username: string;
  group: string;
  avatar_url?:string;
};

export default function ProfileScreen() {
  const {session, loading} = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [image, setImage] = useState<string | null>(null);

  const { data: imageUrl, isLoading } = useProfilePhoto(session?.user.id);
  
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
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
            const { data: publicUrl } = supabase
              .storage
              .from("profile-photos")
              .getPublicUrl(data.avatar_url);
            setImage(publicUrl.publicUrl);
          }
        }
      };

      fetchProfile();
    }, [session])
  );

  return (
    <View style={styles.container}>
      {/* actual profile container here  */}
      <TouchableOpacity activeOpacity={0.8} onPress={() => {router.push({pathname: "/(student)/(misc)/profile",})}}>
        <View style={profileStyles.profileContainer}>
          <View style={profileStyles.profilePhotoContainer}>
            <Image
              source={{ uri: imageUrl }}
              style={profileStyles.profilePhoto}
            />
          </View>
          <View>
            {session && profile ? (
            <>
              <Text style={profileStyles.fullName}>{profile.full_name}</Text>
              <Text>{profile.username}</Text>
              <Text>{session.user.email}</Text>
            </>
          ) : (
            <Text>Loading profile...</Text>
          )}
          </View>
        </View>
      </TouchableOpacity>

      {/* app info */}
      <View style={appInfoStyles.appInfoContainer}  >
        <Text style={appInfoStyles.heading}>App Info</Text>
        <View style={appInfoStyles.oneRowContainer}>
          <Ionicons name="information-circle-outline" size={18} color="black" style={appInfoStyles.leftIconStyles}/>  
          <View style={appInfoStyles.textIconContainer}>        
            <Text style={appInfoStyles.text}>Version 1.0.0</Text>
          </View>
        </View>

        <View style={appInfoStyles.oneRowContainer}>
          <Ionicons name="document-text-outline" size={18} color="black" style={appInfoStyles.leftIconStyles}/>  
          <View style={appInfoStyles.textIconContainer}>        
            <Text style={appInfoStyles.text}>Terms and Conditions</Text>
            <Ionicons name="chevron-forward" size={20} color="#aaa" />
          </View>
        </View>

        <View style={appInfoStyles.oneRowContainer}>
          <Ionicons name="lock-closed" size={18} color="black" style={appInfoStyles.leftIconStyles}/>  
          <View style={appInfoStyles.lastTextIconContainer}>        
            <Text style={appInfoStyles.text}>Privacy Policy</Text>
            <Ionicons name="chevron-forward" size={20} color="#aaa" />
          </View>
        </View>
      </View>
      

      {/* logout functionality */}
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
        <View style={appInfoStyles.singleItems}>
          <Text style={appInfoStyles.warningText}>Logout</Text>
        </View>
      </TouchableOpacity>
    </View>

  );
}

const appInfoStyles = StyleSheet.create({
  appInfoContainer: {
    backgroundColor: "white", 
    borderRadius: 10, 
    marginVertical: 5, 
    paddingHorizontal: 10,
  },
  text : {padding: 7,  fontSize: 16, },

  textIconContainer: {
    flexDirection:'row', 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    borderBottomWidth: 1, 
    borderColor: 'grey' 
  },
  lastTextIconContainer: {
    flexDirection:'row', 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'space-between', 
  },
  heading: {
    borderBottomWidth: 1,
    padding: 7,
    borderColor: 'grey', 
    fontSize: 17, 
    fontWeight:'bold'
  },
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
  leftIconStyles :{
    paddingRight: 5,
  },
  oneRowContainer: {
    alignItems: 'center', 
    flexDirection: 'row', 
    justifyContent: 'space-between',
  },
})

const profileStyles = StyleSheet.create({
  profilePhoto: {
    width: 60,
    height: 60,
    margin: 10,  
    borderRadius: 50,
  },
  fullName: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  profilePhotoContainer: {
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  profileContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
    borderWidth: 2, 
    borderRadius: 15, 
    marginVertical: 10,
    borderColor: 'grey',
    backgroundColor: 'white'
  },
});

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: "lightgreen",
  },
  input: {
    marginBottom: 25,
    backgroundColor: '#E1EBEE',
    textDecorationColor: 'none',
  },
  
});