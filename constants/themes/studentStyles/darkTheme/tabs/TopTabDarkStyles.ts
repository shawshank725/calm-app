import { CommonStyles } from "@/constants/themes/types";

export const TopTabDarkStyles: CommonStyles = {
  TopTab: {
    tabBarStyle: {
      backgroundColor: "#1e1e1e", // dark background
    },
    tabBarActiveTintColor: "#ffffff", // white text for active tab
    tabBarInactiveTintColor: "#aaaaaa", // gray text for inactive tab
    tabBarIndicatorStyle: {
      backgroundColor: "#4a90e2", // soft blue underline
      height: 3,
    },
    tabBarItemStyle: {
      backgroundColor: "#2c2c2c", // slightly lighter than main background
      borderRadius: 8,
      margin: 4,
    },
    tabBarLabelStyle: {
      fontWeight: "bold",
      fontSize: 14,
    },
  },
};
