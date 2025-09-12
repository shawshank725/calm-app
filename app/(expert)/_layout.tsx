import {  DarkTheme,  DefaultTheme,  ThemeProvider,} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";

import { useColorScheme } from "@/hooks/useColorScheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(home)" options={{ headerShown: false }} />
        <Stack.Screen name="(misc)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}