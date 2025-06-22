import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { useFonts } from 'expo-font';
import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';


export default function TabLayout() {
  const colorScheme = useColorScheme();
  //const [fontsLoaded] = useFonts({   Carnevalee: require('assets/fonts/Carnevalee Freakshow.ttf'),  });
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
            height: 90,
            paddingBottom: 20,
            paddingTop: 10,
          },
          default: {
            height: 90,
            paddingBottom: 0,
            paddingTop: 0,
          },
        }),
      }}
    >
      <Tabs.Screen
        name="buddy"
        options={{
          title: "Buddy",
          headerTitleAlign: 'center',
          headerShown: true,
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbubble-ellipses-outline" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerTitleAlign: 'center',
          headerShown: true,
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />),
          headerStyle: {backgroundColor: '#FF7F50', },
          }}
          
      />
      <Tabs.Screen
        name="(selfhelp)"
        options={{
          title: "Self Help",
          headerTitleAlign: 'center',
          headerShown: true,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="self-improvement" size={28} color={color} />
          ),
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
        }}
      />
    </Tabs>
  );
}
