import { supabase } from "@/lib/supabase";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect } from "react";
import {  StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function TabTwoScreen() {
  const navigation = useNavigation();
    const router = useRouter();
  
    useLayoutEffect(() => {
      navigation.setOptions({
        headerTitle: 'Profile',
        headerRight: () => (
          <TouchableOpacity onPress={async () => {
              const { error } = await supabase.auth.signOut();
              if (error) {
                console.error("Logout failed", error);
              } else {
                console.log("Logged out");
                router.replace("/(auth)/sign-in");
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
      <Text>bro</Text>
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
