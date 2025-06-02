import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { Link, useRouter } from "expo-router";
import { homeStyles as styles } from "@/styles/HomeStyles";

export default function AuthScreen() {
  return (
    <View style={styles.container}>
      <Text>This is tab one.</Text>
      <Link href="../">
        <Text>Go to home page</Text>
      </Link>
    </View>
  );
}
