import {  StyleSheet, View } from "react-native";
type Profile = {
  full_name: string;
  username: string;
  group: string;
  avatar_url?:string;
};

export default function ProfileScreen() {
 
  return (
    <View style={styles.container}>
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#B9D9EB",
  },
  imageContainer: {
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  profilePhoto: {
    borderRadius: 100,
    width: '50%',
    aspectRatio: 1,
    borderWidth: 3,
    borderColor: 'black',
  },
  link: {
    color: 'blue',
    paddingTop: 20,
    fontWeight: 'bold'
  }
});