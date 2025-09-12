import { View,  Text, } from "react-native";
import React from "react";
import { useAppTheme } from "@/constants/themes/ThemeManager";

export default function HomeScreen() {
  const { styles } = useAppTheme();
  const screenStyles = styles.HomeScreen;

  return (
    <View style={screenStyles?.container}> 
      <Text>hello expert</Text>     
    </View>
  );
}
