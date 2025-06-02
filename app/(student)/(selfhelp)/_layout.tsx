import { Stack } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="grounding" options={{ headerShown: false }} />
    </Stack>
  );
}
