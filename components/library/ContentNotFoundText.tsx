import { Stack } from "expo-router";
import { View,  Text, } from "react-native";



export const ContentNotFoundText = ({book_author}: {book_author: string}) => {
  return (
    <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}> 
    <Stack.Screen options={{
        title: book_author ,
        headerTitleAlign: 'center',
        headerBackground: () => (<View style={{flex: 1, backgroundColor: 'green'}}></View>),
        headerTintColor: 'white',
        headerTitleStyle: {color: 'white'}
      }}/>
      <Text style={{textAlign: 'center', fontSize: 20, }}>Failed to find books</Text>
    </View>
  );
}
