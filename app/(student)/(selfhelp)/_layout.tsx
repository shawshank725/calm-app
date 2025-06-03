import { Stack } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{title:"Self Help Toolkit",  headerShown: true }} />
      <Stack.Screen name="grounding" options={{ headerShown: true }} />
    </Stack>
  );
}
