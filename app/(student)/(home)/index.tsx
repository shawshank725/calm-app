import { View, Text, ImageBackground, Image } from "react-native";
import React, { useCallback, useState } from "react";
import { Card } from "@/components/home/Card";
import { useAppTheme } from "@/constants/themes/ThemeManager";
import { useFocusEffect, useRouter } from "expo-router";
import QuickAccessButton from "@/components/QuickAccessButton";
import { DEFAULT_PROFILE_PHOTO, QUICK_ACCESS_BUTTON_ICON_COLOR } from "@/constants/Misc";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/providers/AuthProvider";
import { Profile } from "@/types/Profile";
import { supabase } from "@/lib/supabase";

export default function HomeScreen() {
  const { styles } = useAppTheme();
  const screenStyles = styles.HomeScreen;
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const { session, loading } = useAuth();

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
        }
      };

      fetchProfile();
    }, [session])
  );
  return (
    <View style={screenStyles?.container}>
      {/* <Card navigateTo={"/(student)/(library)"}
        opacity={0.7}
        imagePath={require("assets/images/library-card-photo.jpg")}
        heading={"The Support Shelf"}
        description={"Explore self-help books and inspiring stories to guide your growth."}
      /> */}
      <ImageBackground source={{ uri: profile?.avatar_url || DEFAULT_PROFILE_PHOTO }}
          resizeMode="cover" blurRadius={70}>
        <Text>Good morning, {profile?.full_name}</Text>
        <Image source={{ uri: profile?.avatar_url || DEFAULT_PROFILE_PHOTO }} style={{width: 100, height: 100}}/>
      </ImageBackground>

      <View style={screenStyles.quickAccessCard}>
        <Text style={screenStyles.quickAccessHeading}>Quick Access</Text>

        <View style={screenStyles.quickAccessButtonContainer}>
          <QuickAccessButton
            icon={<Ionicons name="library" size={22} color={QUICK_ACCESS_BUTTON_ICON_COLOR} />}
            text="Support Shelf"
            onPress={() => router.navigate("/(student)/(library)")}
          />
          <QuickAccessButton
            icon={<Ionicons name="time" size={22} color={QUICK_ACCESS_BUTTON_ICON_COLOR} />}
            text="Book session"
            onPress={() => router.navigate("/(student)/(misc)/book-slot")}
          />
          <QuickAccessButton
            icon={<Ionicons name="calendar" size={22} color={QUICK_ACCESS_BUTTON_ICON_COLOR} />}
            text="Sessions"
            onPress={() => router.navigate("/(student)/(misc)/all-sessions")}
          />
          <QuickAccessButton
            icon={<Ionicons name="alert-circle" size={22} color={QUICK_ACCESS_BUTTON_ICON_COLOR} />}
            text="Alert"
            onPress={() => { }}
          />
        </View>
      </View>
    </View>
  );
}