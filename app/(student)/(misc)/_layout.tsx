import {  DarkTheme,  DefaultTheme,  ThemeProvider,} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";

import { useColorScheme } from "@/hooks/useColorScheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="showImage" options={{ headerShown: false, }} />
        <Stack.Screen name="info" options={{ headerShown: true, }} />
        <Stack.Screen name="profile" options={{ headerTitle:"Edit Profile" ,  headerShown: true, }} />
        <Stack.Screen name="peer-slots" options={{ headerTitle:"Your Slots" ,  headerShown: true, }} />
        <Stack.Screen name="password" options={{ headerTitle:"Change Password" ,  headerShown: true, headerBackTitle: "Profile" }} />
        
      </Stack>
    </ThemeProvider>
  );
}