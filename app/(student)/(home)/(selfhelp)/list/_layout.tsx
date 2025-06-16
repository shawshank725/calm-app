import { withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator);

export default function SelfHelpNavigator() {
  return (
    <TopTabs
      screenOptions={{
        tabBarLabelStyle: { fontSize: 14, fontWeight: "bold" },
        tabBarStyle: { backgroundColor: "#4169E1" },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#ccc",
        tabBarIndicatorStyle: { backgroundColor: "#fff", height: 3 },
        swipeEnabled: true,
      }}
    >
        <TopTabs.Screen name="cbt"
        options={{
          title: "Self Help",
          headerTitleAlign: 'center',
        }}/>

    </TopTabs>
  );
}
