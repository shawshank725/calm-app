import { StyleSheet, View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import { Link, Redirect, router, useNavigation, useRouter } from "expo-router";
import { homeStyles as styles } from "@/styles/HomeStyles";
import { useLayoutEffect } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { supabase } from "@/lib/supabase";
import MyButton from "@/components/MyButton";

export default function HomeScreen() {
  

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.row}>
          <Link href={"/(student)/(selfhelp)"}>
            <View style={styles.optionButton}>
              <Image
                source={require("../../../assets/images/self-help.png")}
                style={styles.image}
              />
              <Text style={styles.label}>Self Help ToolKit</Text>
            </View>
          </Link>
          <Pressable onPress={() => console.log("self help toolkit 2 pressed")}>
            <View style={styles.optionButton}>
              <Image
                source={require("../../../assets/images/self-help.png")}
                style={styles.image}
              />
              <Text style={styles.label}>Self Help ToolKit</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
