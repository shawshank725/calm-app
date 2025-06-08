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

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="digital-doodle"
        options={{
          title: "Digital Doodle",
          headerTitleAlign: 'center',
          headerLeft: () => {
            const navigation = useNavigation();
            return (
              <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
                <Ionicons name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
            );
          },
          headerShown: true,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="brush" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="journal"
        options={{
          title: "Journal",
          headerTitleAlign: 'center',
          headerLeft: () => {
            const navigation = useNavigation();
            return (
              <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
                <Ionicons name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
            );
          },
          headerShown: true,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="notebook" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
