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
          <Stack.Screen name="digital-doodle" options={{ headerTitle:"Digital Doodle" ,  headerShown: true, }} />
          <Stack.Screen name="journal" options={{ headerTitle:"Journal" ,  headerShown: true, }} />
        </Stack>
    </ThemeProvider>
  );
}