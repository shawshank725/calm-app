import { CommonStyles } from "@/constants/themes/types";

export const TopTabLightStyles: CommonStyles = {
  TopTab: {
    tabBarStyle: {
      backgroundColor: "white", // light background
    },
    tabBarActiveTintColor: "#007AFF", // white text for active tab
    tabBarInactiveTintColor: "#6B7280", // dark text for inactive tab
    tabBarIndicatorStyle: {
      backgroundColor: "#007AFF", // blue underline for active tab
      height: 3,
      zIndex: 2
    },
    tabBarItemStyle: {
      backgroundColor: "transparent", // light blue background for all tabs
      margin: 4,
    },
    tabBarLabelStyle: {
      fontWeight: "bold",
      fontSize: 14,
    },
  },
};
