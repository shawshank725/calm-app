import { Tabs } from "expo-router";
import React from "react";
import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useAppTheme } from "@/constants/themes/ThemeManager";
import { HEADER_COLOR_BLACK, HEADER_COLOR_LIGHT, HEADER_TEXT_COLOR_DARK, HEADER_TEXT_COLOR_LIGHT } from "@/constants/Misc";

export default function TabLayout() {
  const { theme, styles } = useAppTheme();
  const tabStyles = styles.BottomTab;
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tabStyles.BottomTab?.tabBarActiveTintColor,
        tabBarInactiveTintColor: tabStyles.BottomTab?.tabBarInactiveTintColor,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: tabStyles.BottomTab?.tabBarStyle,
      }}
    >      
  
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerTitleAlign: 'center',
          headerShown: true,
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />),
          headerStyle: {backgroundColor: theme === "dark" ? HEADER_COLOR_BLACK: HEADER_COLOR_LIGHT },
          headerTitleStyle: {color: theme === "dark" ? HEADER_TEXT_COLOR_LIGHT: HEADER_TEXT_COLOR_DARK }
          }}
      />
      <Tabs.Screen
        name="(resources)"
        options={{
          title: "Resources",
          headerTitleAlign: 'center',
          headerShown: true,
          tabBarIcon: ({ color }) => (
            <Ionicons name="library-outline" size={28} color={color} />),
          headerStyle: {backgroundColor: theme === "dark" ? HEADER_COLOR_BLACK: HEADER_COLOR_LIGHT },
          headerTitleStyle: {color: theme === "dark" ? HEADER_TEXT_COLOR_LIGHT: HEADER_TEXT_COLOR_DARK }
          }}
      />

      <Tabs.Screen
        name="(library)"
        options={{
          title: "Library",
          headerTitleAlign: 'center',
          tabBarIcon: ({ color }) => (
            <Feather name="book-open" size={28} color={color} />),
          headerStyle: {backgroundColor: theme === "dark" ? HEADER_COLOR_BLACK: HEADER_COLOR_LIGHT },
          headerTitleStyle: {color: theme === "dark" ? HEADER_TEXT_COLOR_LIGHT: HEADER_TEXT_COLOR_DARK }
          }}
      />
      
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerTitleAlign: 'center',
          headerShown: true,
          tabBarIcon: ({ color }) => (
            <AntDesign name="setting" size={28} color={color} />
          ),
          headerStyle: {backgroundColor: theme === "dark" ? HEADER_COLOR_BLACK: HEADER_COLOR_LIGHT },
          headerTitleStyle: {color: theme === "dark" ? HEADER_TEXT_COLOR_LIGHT: HEADER_TEXT_COLOR_DARK }
        }}
      />
    </Tabs>
  );
}
