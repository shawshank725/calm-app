import {  DarkTheme,  DefaultTheme,  } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import Toast from "react-native-toast-message";

import { useColorScheme } from "@/hooks/useColorScheme";
import AuthProvider from "@/providers/AuthProvider";
import toastConfig from "@/components/CustomToast";
import QueryProvider from "@/providers/QueryProvider";
import { ThemeProvider } from "@/constants/themes/ThemeManager";

export default function RootLayout() {

  return (
    // <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
    <ThemeProvider>
      <AuthProvider>
        <QueryProvider>
          <StatusBar style="dark" hidden={false}/>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(student)" options={{ headerShown: false }} />
            <Stack.Screen name="(expert)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{title: "Authentication", headerTitleAlign: 'center', headerShown: true }} />
          </Stack>
          <Toast config={toastConfig}/>
        </QueryProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}