import { CommonStyles } from "@/constants/themes/types";

export const TopTabDarkStyles: CommonStyles = {
  TopTab: {
    tabBarStyle: {
      backgroundColor: "#1C1C1E", // dark background
    },
    tabBarActiveTintColor: "#ffffff", // white text for active tab
    tabBarInactiveTintColor: "#A0A0A0", // gray text for inactive tab
    tabBarIndicatorStyle: {
      backgroundColor: "#3A99FF", // soft blue underline
      height: 3,
    },
    tabBarItemStyle: {
      backgroundColor: "transparent", 
      borderRadius: 8,
      margin: 4,
    },
    tabBarLabelStyle: {
      fontWeight: "bold",
      fontSize: 14,
    },
  },
};
