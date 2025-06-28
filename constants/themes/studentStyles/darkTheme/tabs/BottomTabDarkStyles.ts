import { CommonStyles } from "@/constants/themes/types";
import { Platform } from "react-native";

export const BottomTabDarkStyles: CommonStyles = {
  BottomTab: {
    tabBarActiveTintColor: "yellow",
    tabBarInactiveTintColor: "lightgreen",
    tabBarStyle: Platform.select({
      ios: {
        position: "absolute",
        height: 90,
        paddingBottom: 20,
        paddingTop: 10,
        backgroundColor: "black",
      },
      default: {
        height: 90,
        paddingBottom: 0,
        paddingTop: 0,
        backgroundColor: "black",
      },
    }),
  }
};