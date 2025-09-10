import { Redirect, Stack } from "expo-router";
import React from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemeProvider, DarkTheme, DefaultTheme } from "@react-navigation/native";
import { useAuth } from "@/providers/AuthProvider";

export default function AuthLayout() {

  const {session } = useAuth();

  if (session) {
    return <Redirect href={"/(student)/(home)"}/>;
  }
  
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        <Stack.Screen name="sign-up" options={{ headerShown: false, headerTitleStyle: {fontFamily: 'monospace',}
         }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
