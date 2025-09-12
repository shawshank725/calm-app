import { Tabs, withLayoutContext } from "expo-router";
import React from "react";
import { useAppTheme } from "@/constants/themes/ThemeManager";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();
const TopTabs = withLayoutContext(Tab.Navigator);

export default function TabLayout() {
  const {styles } = useAppTheme();
  const tabStyles = styles?.TopTab?.TopTab ?? {};
  
  return (
    <TopTabs
      screenOptions={{
        swipeEnabled: false,
        animationEnabled: true,
        tabBarScrollEnabled: true,
        tabBarIndicatorStyle: tabStyles.tabBarIndicatorStyle,
        tabBarActiveTintColor: tabStyles.tabBarActiveTintColor,
        tabBarInactiveTintColor: tabStyles.tabBarInactiveTintColor,
        tabBarStyle: tabStyles.tabBarStyle,
        tabBarItemStyle: tabStyles.tabBarItemStyle,
        tabBarLabelStyle: tabStyles.tabBarLabelStyle,
      }}
    >
      <TopTabs.Screen
        name="pdf-tab"
        options={{ title: "PDFs/Books", headerTitleAlign: "center", }}
      />      
    </TopTabs>
  );
}
