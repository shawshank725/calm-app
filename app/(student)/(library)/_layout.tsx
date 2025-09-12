import {  DarkTheme,  DefaultTheme,  ThemeProvider,} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@/constants/themes/ThemeManager";
import { HEADER_COLOR_BLACK, HEADER_COLOR_LIGHT, HEADER_TEXT_COLOR_DARK, HEADER_TEXT_COLOR_LIGHT } from "@/constants/Misc";

export default function RootLayout() {
  const {theme} = useAppTheme();

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
        <Stack.Screen name="[id]" options={{ headerShown: true,  }} />
        <Stack.Screen name="library" 
          options={{ 
            headerTitle:"The Support Shelf" , 
            headerShown: true, headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: theme === "dark" ? HEADER_COLOR_BLACK : HEADER_COLOR_LIGHT,
            },
            headerTitleStyle: {
              color: theme === "dark" ? HEADER_TEXT_COLOR_LIGHT : HEADER_TEXT_COLOR_DARK
            },
            headerLeft: ({ canGoBack }) =>
            canGoBack ? (<Ionicons name="arrow-back" 
                        size={24} 
                        color= {theme === "dark" ? HEADER_TEXT_COLOR_LIGHT : HEADER_TEXT_COLOR_DARK}
                        style={{ marginLeft: 10, borderRadius: 20 }} onPress={() => router.back()}  />
            ) : null,  }} 
                    
        />
      </Stack>
    </ThemeProvider>
  );
}