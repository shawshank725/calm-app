import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";

const GroundingTechniques = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>5-4-3-2-1 Grounding Technique</Text>
      <Text style={styles.description}>
        A simple method to ease stress by using your five senses to bring your
        focus back to the present.
      </Text>

      <Text style={styles.step}>
        <Text style={styles.bold}>5</Text> – Look: Identify five things you can
        see. Focus on color, shape, and texture.
      </Text>
      <Text style={styles.step}>
        <Text style={styles.bold}>4</Text> – Listen: Name four things you can
        hear around you.
      </Text>
      <Text style={styles.step}>
        <Text style={styles.bold}>3</Text> – Touch: Notice three things you can
        physically feel—clothing, surfaces, etc.
      </Text>
      <Text style={styles.step}>
        <Text style={styles.bold}>2</Text> – Smell: Focus on two scents near
        you, like soap or fresh air.
      </Text>
      <Text style={styles.step}>
        <Text style={styles.bold}>1</Text> – Taste: Identify one thing you can
        taste, like water or mint.
      </Text>

      <Text style={styles.note}>
        You can do this anytime, anywhere. It’s a quick, effective way to calm
        your mind.
      </Text>
    </ScrollView>
  );
};

export default GroundingTechniques;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'lightyellow',
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    color: "#444",
  },
  step: {
    fontSize: 16,
    marginBottom: 12,
    color: "#333",
    lineHeight: 22,
  },
  bold: {
    fontWeight: "bold",
  },
  note: {
    marginTop: 20,
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
    textAlign: "center",
  },
});
