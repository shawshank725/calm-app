import NewButton from "@/components/NewButton";
import { SearchBarProps } from "@/constants/LibraryData";
import { Ionicons } from "@expo/vector-icons";
import { View,  TouchableOpacity,  TextInput } from "react-native";


export const LibrarySearchBar = ({ text, setText, onSearch }: SearchBarProps) => {
  return (
    <View style={{flexDirection: 'row', 
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 5,
      alignItems:'center',
      columnGap: 10,
      marginBottom: 10, 
      }}>
      <View style={{flex: 2,flexDirection: 'row', alignItems: 'center', columnGap: 10}}>
      <View style={{flex: 1}}>
        <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Enter book or author name"
        style={{backgroundColor: '#E1EBEE', textDecorationColor: 'none', borderRadius: 10,}}/>
      </View>
      <TouchableOpacity activeOpacity={0.8} onPress={()=> {setText("")}}>
        <Ionicons name="close-circle-outline" size={30} color="green"/>
      </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <NewButton title="Search" onPress={onSearch || (() => {})} />
      </View>
    </View>);
}