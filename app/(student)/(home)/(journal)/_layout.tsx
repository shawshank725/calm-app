import { useFonts } from "expo-font";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { useAppTheme } from "@/constants/themes/ThemeManager";

const Tab = createMaterialTopTabNavigator();
const TopTabs = withLayoutContext(Tab.Navigator);

export default function RootLayout() {
  const {styles } = useAppTheme();
  const tabStyles = styles?.TopTab?.TopTab ?? {};
  
  const [loaded] = useFonts({
    SpaceMono: require("assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <TopTabs
      screenOptions={{
        swipeEnabled: false,
        animationEnabled: true,
        tabBarScrollEnabled: true,
        tabBarIndicatorStyle: tabStyles.tabBarIndicatorStyle,
        tabBarActiveTintColor: tabStyles.tabBarActiveTintColor,
        tabBarInactiveTintColor: tabStyles.tabBarInactiveTintColor,
        tabBarStyle: tabStyles.tabBarStyle,
        tabBarItemStyle: tabStyles.tabBarItemStyle,
        tabBarLabelStyle: tabStyles.tabBarLabelStyle,
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
      <TopTabs.Screen
        name="growth-tracker"
        options={{ title: "Growth Tracker", headerTitleAlign: "center" }}
      />
      
    </TopTabs>
  );
}