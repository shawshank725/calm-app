import NewButton from "@/components/NewButton";
import { SearchBarProps } from "@/constants/LibraryData";
import { useAppTheme } from "@/constants/themes/ThemeManager";
import { Ionicons } from "@expo/vector-icons";
import { View,  TouchableOpacity,  TextInput,StyleSheet } from "react-native";


export const LibrarySearchBar = ({ text, setText, onSearch }: SearchBarProps) => {
  
  const {styles} = useAppTheme();
  const screenStyles = styles.LibrarySearchBar;

  return (
    <View style={screenStyles.librarySearchBarContainer}>
      <View style={screenStyles.searchBarAndCrossContainer}>
        <View style={{flex: 1}}>
          <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Enter book or author name"
          style={screenStyles.searchInputStyles}/>
        </View>

        <TouchableOpacity activeOpacity={0.8} onPress={()=> {setText("")}}>
          <Ionicons name="close-circle-outline" size={30} color="green"/>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        <NewButton title="Search" onPress={onSearch || (() => {})} />
      </View>
    </View>
  );
}