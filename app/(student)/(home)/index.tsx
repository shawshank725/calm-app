import { View, Text, Image, Pressable } from "react-native";
import { Link } from "expo-router";
import { homeStyles as styles } from "@/styles/HomeStyles";

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
