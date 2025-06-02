import { StyleSheet } from "react-native";
export const selfHelpStyles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
    flex: 1,
  },
  box: {
    backgroundColor: "#f2f2f2",
    borderRadius: 16,
    overflow: "hidden",
    marginTop: 20,
    elevation: 4, // for Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  headingContainer: {
    backgroundColor: "#2e86de",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  boxHeading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  contentContainer: {
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  subHeading: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 8,
    color: "#333",
  },
  scrollContainer: {
    paddingVertical: 20,
    paddingBottom: 40,
  },
});
