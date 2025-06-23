import {  DarkTheme,  DefaultTheme,  ThemeProvider,} from "@react-navigation/native";
import { useFonts } from "expo-font";

import { useColorScheme } from "@/hooks/useColorScheme";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";


const Tab = createMaterialTopTabNavigator();
const TopTabs = withLayoutContext(Tab.Navigator);

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
    <TopTabs
     // tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        swipeEnabled: false,
        animationEnabled: true,
        //tabBarItemStyle: { width: 'auto' },
      }}
    >
      <TopTabs.Screen
        name="digital-doodle"
        options={{ title: "Digital Doodle", headerTitleAlign: "center", }}
      />
      <TopTabs.Screen
        name="journal"
        options={{ title: "Journalling", headerTitleAlign: "center" }}
      />
      
    </TopTabs>
  );
}