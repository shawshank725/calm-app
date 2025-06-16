import { Tabs, useNavigation } from "expo-router";
import React from "react";
import { Platform, TouchableOpacity } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Ionicons } from '@expo/vector-icons'; // Or any other icon lib
// Icon libraries
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'; // for doodle/notebook icons

import { withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator);

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <TopTabs
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12, fontWeight: "bold" },
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
      }}
    >
      <TopTabs.Screen
        name="digital-doodle"
        options={{
          title: "Digital Doodle",
          headerTitleAlign: 'center',
          headerShown: true,
          tabBarIcon: () => (
            <MaterialCommunityIcons name="brush" size={18} />
          ),
        }}
      />
      <TopTabs.Screen
        name="journal"
        options={{
          title: "Journal",
          headerTitleAlign: 'center',
          headerShown: true,
          tabBarIcon: () => (
            <MaterialCommunityIcons name="notebook" size={18} />
          ),
        }}
      />
    </TopTabs>
  );
}
