import { TouchableOpacity, Linking, Text, StyleSheet } from "react-native";

export const SGTLibraryLink = () => {
    return (
    <TouchableOpacity activeOpacity={0.7}
        onPress={() => Linking.openURL("http://1.6.136.107/")}    >
        <Text style={styles.linkText}>Go to SGT University's E-Library</Text>
    </TouchableOpacity>);

}

const styles = StyleSheet.create({  
  linkText: {
    fontSize: 17,
    fontWeight: 'bold',
    borderRadius: 10,
    color: 'blue',
    textAlign: 'center',
    backgroundColor: 'yellow',
    marginBottom: 10, 
  },
})