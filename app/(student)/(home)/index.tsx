import { View,  Text, } from "react-native";
import React from "react";
import { Card } from "@/components/home/Card";
import { useAppTheme } from "@/constants/themes/ThemeManager";

export default function HomeScreen() {
  const { styles } = useAppTheme();
  const screenStyles = styles.HomeScreen;

  return (
    <View style={screenStyles?.container}> 

      <Card navigateTo={"/(student)/(library)"} 
        opacity={0.7} 
        imagePath={require("assets/images/library-card-photo.jpg")} 
        heading={"The Support Shelf"} 
        description={"Explore self-help books and inspiring stories to guide your growth."} 
      />      
    </View>
  );
}
