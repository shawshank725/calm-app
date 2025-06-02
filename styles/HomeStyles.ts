import { StyleSheet } from "react-native";
export const homeStyles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly", // centers buttons in the row with space
    alignItems: "center",
    marginTop: 20,
  },
  optionButton: {
    width: 160,
    height: 200, // Enough to fit image and text
    backgroundColor: "green",
    borderRadius: 20,
    padding: 10,
    justifyContent: "center",
    alignItems: "center", // center content horizontally
  },
  image: {
    width: 140,
    height: 140,
    marginBottom: 10,
  },
  label: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
