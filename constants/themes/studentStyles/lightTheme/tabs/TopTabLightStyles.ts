import { CommonStyles } from "@/constants/themes/types";

export const TopTabLightStyles: CommonStyles = {
  TopTab: {
    tabBarStyle: {
      backgroundColor: "black", // light background
    },
    tabBarActiveTintColor: "#ffffff", // white text for active tab
    tabBarInactiveTintColor: "#333333", // dark text for inactive tab
    tabBarIndicatorStyle: {
      backgroundColor: "#007AFF", // blue underline for active tab
      height: 3,
      zIndex: 2
    },
    tabBarItemStyle: {
      backgroundColor: "lightblue", // light blue background for all tabs
      margin: 4,
    },
    tabBarLabelStyle: {
      fontWeight: "bold",
      fontSize: 14,
    },
  },
};
