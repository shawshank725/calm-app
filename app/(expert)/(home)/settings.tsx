import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import {  useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {  StyleSheet, View, Text,Image, TouchableOpacity, Switch } from "react-native";
import Toast from "react-native-toast-message";
import { useProfilePhoto } from "@/api/profile/Profile";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppTheme } from "@/constants/themes/ThemeManager";

type Profile = {
  full_name: string;
  username: string;
  group: string;
  avatar_url?:string;
};

export default function ProfileScreen() {
  const { styles } = useAppTheme();
  const screenStyles = styles.SettingsScreen;

  const {session, loading} = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const { theme, toggleTheme } = useAppTheme();
  const [isEnabled, setIsEnabled] = useState(theme === 'dark');

  const { data: imageUrl, isLoading } = useProfilePhoto(session?.user.id);
  
  const router = useRouter();

  useEffect(() => {
    setIsEnabled(theme === 'dark');
  }, [theme]);
  

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
    <View style={screenStyles.container}>
      {/* actual profile container here  */}
      <TouchableOpacity activeOpacity={0.8} onPress={() => {router.push({pathname: "/(expert)/(misc)/profile",})}}>
        <View style={screenStyles.profileContainer}>
          <View style={screenStyles.profilePhotoContainer}>
            <Image
              source={{ uri: imageUrl }}
              style={screenStyles.profilePhoto}
            />
          </View>
          <View>
            {session && profile ? (
            <>
              <Text style={screenStyles.fullName}>{profile.full_name}</Text>
              {
                profile.username && <Text style={screenStyles.username}>{profile.username}</Text>
              }
              <Text style={screenStyles.email}>{session.user.email}</Text>
            </>
          ) : (
            <Text>Loading profile...</Text>
          )}
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={async () => {router.navigate(`/(expert)/(misc)/expert-slots`)}} activeOpacity={0.7}>
        <View style={screenStyles.singleItems}>
          <Text style={screenStyles.text}>View/Edit your slots</Text>
        </View>
      </TouchableOpacity>


      {/* app info */}
      <View style={screenStyles.appInfoContainer}  >
        <Text style={screenStyles.heading}>App Info</Text>
        <View style={screenStyles.oneRowContainer}>
          <Ionicons name="information-circle-outline" size={18} color="black" style={screenStyles.leftIconStyles}/>  
          <View style={screenStyles.textIconContainer}>        
            <Text style={screenStyles.text}>Version 1.0.0</Text>
          </View>
        </View>

        <View style={screenStyles.oneRowContainer}>
          <Ionicons name="document-text-outline" size={18} color="black" style={screenStyles.leftIconStyles}/>  
          <View style={screenStyles.textIconContainer}>        
            <Text style={screenStyles.text}>Terms and Conditions</Text>
            <Ionicons name="chevron-forward" size={20} color="#aaa" />
          </View>
        </View>

        <View style={screenStyles.oneRowContainer}>
          <Ionicons name="lock-closed" size={18} color="black" style={screenStyles.leftIconStyles}/>  
          <View style={screenStyles.lastTextIconContainer}>        
            <Text style={screenStyles.text}>Privacy Policy</Text>
            <Ionicons name="chevron-forward" size={20} color="#aaa" />
          </View>
        </View>
      </View>
      
      <View style={screenStyles.switchContainer}>
        <Text style={screenStyles.text}>{isEnabled ? "Dark" : "Light"} Mode on: </Text>
        <Switch 
          value={isEnabled}
          onValueChange={async (value) => {
            setIsEnabled(value);
            try {
              await AsyncStorage.setItem('theme', value ? 'dark' : 'light');
            } catch (error) {
              console.log("Failed to save theme:", error);
            }
            toggleTheme(); 
          }}
          trackColor={{ false: "grey", true: 'green' }}
          thumbColor={"lightblue"}
        />
      </View>

      {/* logout functionality */}
      <TouchableOpacity onPress={async () => {
            const userId = session?.user.id; 
            const { error } = await supabase.auth.signOut();
            if (error) {
              Toast.show({
                type: 'error', 
                text1: 'Could not log out',
                position: 'bottom', 
                visibilityTime: 2000
              });
            } else {
              console.log("Logged out");
              router.replace("/(auth)/sign-in");
              Toast.show({
                type: 'success', 
                text1: 'Log out successful',
                position: 'bottom',
                visibilityTime: 1500
              });
            }
          }} activeOpacity={0.7}>
        <View style={screenStyles.singleItems}>
          <Text style={screenStyles.warningText}>Logout</Text>
        </View>
      </TouchableOpacity>
    </View>

  );
}