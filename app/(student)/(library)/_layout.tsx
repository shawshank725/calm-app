import {  DarkTheme,  DefaultTheme,  ThemeProvider,} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";

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
        <Stack.Screen name="searchResult" options={{ headerShown: false, headerTitleAlign: 'center' }} />
        <Stack.Screen name="[id]" options={{ headerShown: true, headerTitleAlign: 'center', headerTintColor: 'white' }} />
        <Stack.Screen name="library" 
          options={{ 
            headerTitle:"The Support Shelf" , 
            headerShown: true, headerTitleAlign: 'center',
            headerLeft: ({ canGoBack }) =>
            canGoBack ? (<Ionicons name="arrow-back" 
                        size={24} 
                        color="black" 
                        style={{ marginLeft: 10, borderRadius: 20 }} onPress={() => router.back()}  />
            ) : null,  }} />
      </Stack>
    </ThemeProvider>
  );
}