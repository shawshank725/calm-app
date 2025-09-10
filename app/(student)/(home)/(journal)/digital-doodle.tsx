import React, { useLayoutEffect, useRef, useState, } from "react";
import {  View,  StyleSheet,  useWindowDimensions,  TouchableOpacity,  ActivityIndicator, Platform,} from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import { Canvas, Path } from "@shopify/react-native-skia";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import ColorPicker from "react-native-wheel-color-picker";
import { captureRef } from 'react-native-view-shot';

import * as Sharing from 'expo-sharing';
import { useNavigation } from "expo-router";

interface IPath {
  segments: String[];
  color?: string;
}

export default function DigitalDoodle() {
  const [paths, setPaths] = useState<IPath[]>([]);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [currentColor, setCurrentColor] = useState("#06d6a0");

  const { width } = useWindowDimensions();
  const navigation = useNavigation();

  const viewRef = useRef(null);
  
  const pan = Gesture.Pan()
    .onStart((g) => {
      setShowColorPicker(false);
      setPaths((prev) => [
        ...prev,
        {
          segments: [`M ${g.x} ${g.y}`],
          color: currentColor,
        },
      ]);
    })
    .onUpdate((g) => {
      setPaths((prev) => {
        const last = prev[prev.length - 1];
        if (!last) return prev;

        const updated = [...prev];
        updated[updated.length - 1] = {
          ...last,
          segments: [...last.segments, `L ${g.x} ${g.y}`],
        };
        return updated;
      });
    })
    .minDistance(1)
    .runOnJS(true);

  const singleTap = Gesture.Tap().onEnd((_event, success) => {
    if (success){
      setShowColorPicker(false);
    }
  }).runOnJS(true);

  const snapshot = async () => {
    const result = await captureRef(viewRef);
    return result;
  }

  const shareImage = async (imageURL: string) => {
    try {
      if (imageURL){
        await Sharing.shareAsync(imageURL)
      }
      else {
        console.log("Image uri is not available")
      }
    }
    catch (error){
      console.error("falied to share the image.");
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Digital Doodle",
      headerLeft: () => (
        <TouchableOpacity
          style={{ paddingLeft: 0 }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={28} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={Gesture.Exclusive(pan,)}>
        <View ref={viewRef} style={{ flex: 1 }}>
          <Canvas style={{ flex: 1 }} >
            {paths.map((p, index) => (
              <Path
                key={index}
                path={p.segments.join(" ")}
                strokeWidth={5}
                style="stroke"
                color={p.color}
              />
            ))}
          </Canvas>

          <View
            style={{
              height: 50, 
              position: "absolute",
              bottom: Platform.OS == "ios" ? 100: 5,
              flexDirection: "row",
              justifyContent: "space-evenly",
              backgroundColor: "white",
              width:'auto',
              paddingHorizontal:10,
              alignSelf: "center",
              borderRadius: 10,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 6 }, // deeper shadow
              shadowOpacity: 0.15, // subtle but noticeable
              shadowRadius: 10, // softer edges
              elevation: 8, // Android shadow
              alignItems: 'center',
              overflow: 'hidden'
            }}
          >
            <TouchableOpacity onPress={() => setPaths([])} style={{}}>
              <Ionicons name="trash" size={25} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {setShowColorPicker(!showColorPicker); }} 
              style={{
              backgroundColor: showColorPicker ? 'lightgreen' : 'transparent',
              width: 60,
              height: 60,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Ionicons name="color-palette" size={25} />
            </TouchableOpacity>

            <TouchableOpacity onPress={async () => {
              const imageURL = await snapshot();
              shareImage(imageURL);
            }}>
              <MaterialIcons name="share" size={25}  style={{}}/>
            </TouchableOpacity>


          </View>

          {showColorPicker && (
            <View
              style={{
                position: "absolute",
                bottom: 120,
                backgroundColor: "gainsboro",
                borderRadius: 10,
                margin:10, 
                padding: 10,
                alignSelf: "center",
              }}
            >
              <ColorPicker
                color={currentColor}
                onColorChangeComplete={(color) => setCurrentColor(color)}
                thumbSize={30}
                sliderSize={0}           // hides the slider
                useNativeDriver={false}
                discrete={true}
                swatches={true}         // hides swatches
                swatchesOnly={false}     // ensures wheel is visible
                wheelLoadingIndicator={<ActivityIndicator size={40} />}
                sliderLoadingIndicator={<ActivityIndicator size={20} />}
              />

            </View>
          )}
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
