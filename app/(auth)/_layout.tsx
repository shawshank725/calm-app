import { Stack } from "expo-router";
import React from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemeProvider, DarkTheme, DefaultTheme } from "@react-navigation/native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
