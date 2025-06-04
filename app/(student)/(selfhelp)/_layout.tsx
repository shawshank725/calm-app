import { Stack } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{
                    title:"Self Help Toolkit",
                    headerTitleAlign: 'center', 
                    headerShown: true,
                    //headerStyle: {backgroundColor: '#679267',},
                     }} />
      <Stack.Screen name="grounding" options={{title:"Grounding Techniques",headerTitleAlign: 'center', headerShown: true }} />
      <Stack.Screen name="cbt" options={{title:"CBT Exercises",headerTitleAlign: 'center', headerShown: true }} />
    </Stack>
  );
}
