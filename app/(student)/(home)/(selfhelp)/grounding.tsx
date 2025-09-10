import {  Text, ScrollView } from "react-native";
import React from "react";
import { useAppTheme } from "@/constants/themes/ThemeManager";

const GroundingTechniques = () => {
  const { styles } = useAppTheme();
  const screenStyles = styles.GroundingScreen; 

  return (
    <ScrollView contentContainerStyle={screenStyles.container}>
      <Text style={screenStyles.heading}>5-4-3-2-1 Grounding Technique</Text>
      <Text style={screenStyles.description}>
        A simple method to ease stress by using your five senses to bring your
        focus back to the present.
      </Text>

      <Text style={screenStyles.step}>
        <Text style={screenStyles.bold}>5</Text> – Look: Identify five things you can
        see. Focus on color, shape, and texture.
      </Text>
      <Text style={screenStyles.step}>
        <Text style={screenStyles.bold}>4</Text> – Listen: Name four things you can
        hear around you.
      </Text>
      <Text style={screenStyles.step}>
        <Text style={screenStyles.bold}>3</Text> – Touch: Notice three things you can
        physically feel—clothing, surfaces, etc.
      </Text>
      <Text style={screenStyles.step}>
        <Text style={screenStyles.bold}>2</Text> – Smell: Focus on two scents near
        you, like soap or fresh air.
      </Text>
      <Text style={screenStyles.step}>
        <Text style={screenStyles.bold}>1</Text> – Taste: Identify one thing you can
        taste, like water or mint.
      </Text>

      <Text style={screenStyles.note}>
        You can do this anytime, anywhere. It’s a quick, effective way to calm
        your mind.
      </Text>
    </ScrollView>
  );
};

export default GroundingTechniques;