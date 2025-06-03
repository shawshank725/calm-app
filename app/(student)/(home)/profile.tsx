import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect } from "react";
import {  StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";

export default function TabTwoScreen() {
  const {session, loading} = useAuth();
  
  const navigation = useNavigation();
  const router = useRouter();


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

  return (
    <View>
      {session && (
        <>
          <Text>Email: {session.user.email}</Text>
        </>
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
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
