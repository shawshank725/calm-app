import { withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator,  } from "@react-navigation/material-top-tabs";
import { useAppTheme } from "@/constants/themes/ThemeManager";

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
        options={{ title: "Grounding Exercises", headerTitleAlign: "center",}}
        
      />
      <TopTabs.Screen
        name="breathing"
        options={{ title: "Breathing Exercises", headerTitleAlign: "center" }}
      />
      <TopTabs.Screen
        name="bodyMovement"
        options={{ title: "Exercises", headerTitleAlign: "center", }}
      />
      <TopTabs.Screen
        name="mentalFocus"
        options={{ title: "Mental Focus", headerTitleAlign: "center", }}
      />
    </TopTabs>
  );
}