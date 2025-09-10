import { CommonStyles } from "@/constants/themes/types";
import { Platform } from "react-native";

export const BottomTabLightStyles: CommonStyles = {
  BottomTab: {
    tabBarActiveTintColor: "#007AFF",
    tabBarInactiveTintColor: "grey",
    tabBarStyle: Platform.select({
      ios: {
        position: "absolute",
        height: 90,
        paddingBottom: 20,
        paddingTop: 10,
        backgroundColor: "#FFFFFF",
      },
      default: {
        height: 90,
        paddingBottom: 0,
        paddingTop: 0,
        backgroundColor: "#FFFFFF",
      },
    }),
  }
};