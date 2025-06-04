import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import { Link, useNavigation, useRouter } from "expo-router";
import { homeStyles as styles } from "@/styles/HomeStyles";
import React, { useLayoutEffect } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function HomeScreen() {

  const navigation = useNavigation();
  const router = useRouter();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            router.push("/info");
          }}
          style={{ marginRight: 16 }}
        >
          <MaterialIcons
          name="info" // <- icon name
          size={28}
          color="green"
          style={{ marginRight: 16 }}
        />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.row}>
          <Link href={"/(student)/(selfhelp)"}>
            <View style={styles.optionButton}>
              <Image
                source={require("../../../assets/images/self help/notebook.png")}
                style={styles.image}
              />
              <Text style={styles.label}>Self Help ToolKit</Text>
            </View>
          </Link>

          <Link href={"/(student)/(selfhelp)"}>
            <View style={styles.optionButton}>
              <Image
                source={require("../../../assets/images/self help/rainbow.png")}
                style={styles.image}
              />
              <Text style={styles.label}>Calm Kit</Text>
            </View>
          </Link>
        </View>

        <View style={styles.row}>
          <Link href={"/(student)/(selfhelp)"}>
            <View style={styles.optionButton}>
              <Image
                source={require("../../../assets/images/self help/yoga.png")}
                style={styles.image}
              />
              <Text style={styles.label}>Breath & Move Zone</Text>
            </View>
          </Link>

          <Link href={"/(student)/(selfhelp)"}>
            <View style={styles.optionButton}>
              <Image
                source={require("../../../assets/images/self help/journal.png")}
                style={styles.image}
              />
              <Text style={styles.label}>Journal & Check-ins</Text>
            </View>
          </Link>
        </View>
      </View>
    </View>
  );
}
