import { View, Text } from "react-native";
import React from "react";
import { Redirect } from "expo-router";

const HomeIndex = () => {
  return <Redirect href={"/(student)/(home)"} />;
};

export default HomeIndex;
