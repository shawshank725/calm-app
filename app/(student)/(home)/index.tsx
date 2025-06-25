import { View,  StyleSheet, } from "react-native";
import React from "react";
import { Card } from "@/components/home/Card";

export default function HomeScreen() {
  return (
    <View style={styles.container}> 
      <Card navigateTo={"/(student)/(library)"} 
        opacity={0.7} 
        imagePath={require("assets/images/library-card-photo.jpg")} 
        heading={"The Support Shelf"} 
        description={"Explore self-help books and inspiring stories to guide your growth."} 
      />      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#B9D9EB",
    flex: 1,
  },
});