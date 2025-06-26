import { useAppTheme } from "@/constants/themes/ThemeManager";
import { TouchableOpacity, Linking, Text, StyleSheet } from "react-native";

export const SGTLibraryLink = () => {
  const {styles} = useAppTheme();
  const screenStyles = styles.SGTLibraryLink;
    return (
    <TouchableOpacity activeOpacity={0.7}
        onPress={() => Linking.openURL("http://1.6.136.107/")}    >
        <Text style={screenStyles.linkText}>Go to SGT University's E-Library</Text>
    </TouchableOpacity>);

}