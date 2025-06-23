import { withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator, MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import {  View,  Text,  TouchableOpacity,  StyleSheet,  useColorScheme,} from "react-native";

const Tab = createMaterialTopTabNavigator();
const TopTabs = withLayoutContext(Tab.Navigator);

function CustomTabBar({ state, descriptors, navigation }: MaterialTopTabBarProps) {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title ?? route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={onPress}
            style={[styles.tabButton, isFocused && styles.activeTabButton]}
          >
            <Text style={[styles.tabText, isFocused && styles.activeTabText]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function SelfHelpNavigator() {
  return (
    <TopTabs
      // tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        swipeEnabled: false,
        animationEnabled: true,
        tabBarScrollEnabled: true,
        //tabBarItemStyle: { width: 'auto' },
      }}
    >
      <TopTabs.Screen
        name="grounding"
        options={{ title: "Grounding", headerTitleAlign: "center", }}
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
