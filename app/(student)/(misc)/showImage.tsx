// app/ShowImage.tsx
import { useLocalSearchParams, useNavigation } from "expo-router";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ImageViewer from "react-native-image-zoom-viewer";

export default function ShowImage() {
  const { url } = useLocalSearchParams();
  const navigation = useNavigation();

  if (!url || typeof url !== "string") return null;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="close" size={30} color="white" />
      </TouchableOpacity>

      <ImageViewer
        imageUrls={[{ url }]} // expects array of image objects with {url: string}
        backgroundColor="black"
        enableSwipeDown
        onSwipeDown={() => navigation.goBack()}
        renderIndicator={() => <></>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 10,
  },
});
