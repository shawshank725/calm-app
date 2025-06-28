// TopTabLightStyles.ts
import { CommonStyles } from "@/constants/themes/types";

export const TopTabLightStyles: CommonStyles = {
  TopTab: {
    tabBarStyle: {
      backgroundColor: "#f5f5f5", // light background
    },
    tabBarActiveTintColor: "#ffffff", // white text for active tab
    tabBarInactiveTintColor: "#333333", // dark text for inactive tab
    tabBarIndicatorStyle: {
      backgroundColor: "#007AFF", // blue underline for active tab
      height: 3,
    },
    tabBarItemStyle: {
      backgroundColor: "#d0e8ff", // light blue background for all tabs
      borderRadius: 8,
      margin: 4,
    },
    tabBarLabelStyle: {
      fontWeight: "bold",
      fontSize: 14,
    },
  },
};
