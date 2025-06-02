import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";

const index = () => {
  return (
    <View>
      <Text>this is splash screen and login screen.</Text>
      <Link href={"/(student)/(home)"}>
        <Text>click here to go to home screen</Text>
      </Link>
    </View>
  );
};

export default index;
