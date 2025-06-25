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
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="booksByAuthor" options={{ headerShown: false }} />
        <Stack.Screen name="library" options={{ headerTitle:"The Support Shelf" , 
                                                headerBackTitle: "Home",
                                                headerShown: true, headerTitleAlign: 'center' }} />
      </Stack>
    </ThemeProvider>
  );
}