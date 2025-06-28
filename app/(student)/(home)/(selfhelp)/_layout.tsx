import { withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator,  } from "@react-navigation/material-top-tabs";
import {   StyleSheet} from "react-native";
import { useAppTheme } from "@/constants/themes/ThemeManager";
import { useFonts } from "expo-font";

const Tab = createMaterialTopTabNavigator();
const TopTabs = withLayoutContext(Tab.Navigator);


export default function SelfHelpNavigator() {
  const {styles } = useAppTheme();
  const tabStyles = styles?.TopTab?.TopTab ?? {};
  
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
        name="grounding"
        options={{ title: "Grounding", headerTitleAlign: "center",}}
      />
      <TopTabs.Screen
        name="breathing"
        options={{ title: "Breathing", headerTitleAlign: "center" }}
      />
      <TopTabs.Screen
        name="bodyMovement"
        options={{ title: "Exercises", headerTitleAlign: "center", }}
      />
      <TopTabs.Screen
        name="mandalas"
        options={{ title: "Mandalas", headerTitleAlign: "center", }}
      />
      <TopTabs.Screen
        name="mentalFocus"
        options={{ title: "Focus", headerTitleAlign: "center", }}
      />
    </TopTabs>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: "row",
    backgroundColor: "white",  // change this to change background color of the top tab bar
    marginHorizontal: 10,
    borderRadius: 10,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  activeTabButton: {
    backgroundColor: "#4169E1",
  },
  tabText: {
    fontWeight: "600",
    color: "#444",
  },
  activeTabText: {
    color: "white",
  },
});
