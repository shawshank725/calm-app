import { CommonStyles } from "@/constants/themes/types";
import { Platform } from "react-native";

export const BottomTabDarkStyles: CommonStyles = {
  BottomTab: {
    tabBarActiveTintColor: "#3A99FF",
    tabBarInactiveTintColor: "#A0A0A0",
    tabBarStyle: Platform.select({
      ios: {
        position: "absolute",
        height: 90,
        paddingBottom: 20,
        paddingTop: 10,
        backgroundColor: "#1C1C1E",
      },
      default: {
        height: 90,
        paddingBottom: 0,
        paddingTop: 0,
        backgroundColor: "#1C1C1E",
      },
    }),
  }
};