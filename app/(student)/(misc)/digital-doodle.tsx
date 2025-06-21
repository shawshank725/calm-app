import { View, StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

const DigitalDoodle = () => {
  const [xCoordinate, setXCoordinate] = useState<undefined | string>('');

  const [gestureStart, setGestureStart] = useState<undefined | string>();
  const [gestureMove, setGestureMove] = useState<undefined | string>();
  const [gestureUpdate, setGestureUpdate] = useState<undefined | string>();
  const [gestureEnd, setGestureEnd] = useState<undefined | string>();
  
  const singleTap = Gesture.Tap().onEnd((event, success) => {
    if (success) {
      console.log("Single tap");
    }
  });

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd((_event, success) => {
      if (success) {
        console.log("Double tap");
      }
    });

  const pan = Gesture.Pan().onStart((g) => {
    setGestureStart(`${Math.round(g.x)}, ${Math.round(g.y)}`);
  }).runOnJS(true);

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={pan}>
        <View style={styles.centeredView}>
          <Text style={styles.coordinateText}>{gestureStart}</Text>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default DigitalDoodle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B9D9EB",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  coordinateText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
