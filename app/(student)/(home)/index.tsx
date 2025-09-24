import { View, Text } from "react-native";
import React from "react";
import { useAppTheme } from "@/constants/themes/ThemeManager";
import { useRouter } from "expo-router";
import QuickAccessButton from "@/components/QuickAccessButton";
import { QUICK_ACCESS_BUTTON_ICON_COLOR } from "@/constants/Misc";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const { styles } = useAppTheme();
  const screenStyles = styles.HomeScreen;
  const router = useRouter();

  return (
    <View style={screenStyles?.container}>
      {/* <Card navigateTo={"/(student)/(library)"}
        opacity={0.7}
        imagePath={require("assets/images/library-card-photo.jpg")}
        heading={"The Support Shelf"}
        description={"Explore self-help books and inspiring stories to guide your growth."}
      /> */}

      <View style={screenStyles.quickAccessCard}>
        <Text style={screenStyles.quickAccessHeading}>Quick Access</Text>

        <View style={screenStyles.quickAccessButtonContainer}>
          <QuickAccessButton
            icon={<Ionicons name="library" size={22} color={QUICK_ACCESS_BUTTON_ICON_COLOR} />}
            text="Support Shelf"
            onPress={() => router.navigate("/(student)/(library)")}
          />
          <QuickAccessButton
            icon={<Ionicons name="time" size={22} color={QUICK_ACCESS_BUTTON_ICON_COLOR} />}
            text="Book session"
            onPress={() => router.navigate("/(student)/(misc)/book-slot")}
          />
          <QuickAccessButton
            icon={<Ionicons name="calendar" size={22} color={QUICK_ACCESS_BUTTON_ICON_COLOR} />}
            text="Sessions"
            onPress={() => router.navigate("/(student)/(misc)/all-sessions")}
          />
          <QuickAccessButton
            icon={<Ionicons name="alert-circle" size={22} color={QUICK_ACCESS_BUTTON_ICON_COLOR} />}
            text="Alert"
            onPress={() => { }}
          />
        </View>
      </View>
    </View>
  );
}