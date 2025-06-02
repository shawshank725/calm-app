import { Link, LinkProps } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

type HeaderProps = {
  title: string;
  backPage: LinkProps["href"];
};

const Header = ({ title, backPage }: HeaderProps) => {
  return (
    <View style={styles.headerContainer}>
      <Link href={backPage} style={styles.backButton}>
        <Text style={styles.backArrow}>←</Text>
      </Link>
      <View style={styles.titleWrapper}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    position: "relative",
  },
  backButton: {
    zIndex: 2, // keep it on top
  },
  backArrow: {
    fontSize: 24,
    fontWeight: "bold",
  },

  titleWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    padding: 8,
    borderWidth: 4,
    borderColor: "black",
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Header;
