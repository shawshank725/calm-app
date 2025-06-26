import { useAppTheme } from "@/constants/themes/ThemeManager";
import { Stack } from "expo-router";
import { View,  Text, StyleSheet, } from "react-native";

export const ContentNotFoundText = ({book_author}: {book_author: string}) => {
  const {styles } = useAppTheme();
  const screenStyles = styles.ContentNotFoundText;

  return (
    <View style={screenStyles.container}> 
    <Stack.Screen options={{
        title: book_author ,
        headerTitleAlign: 'center',
        headerBackground: () => (<View style={screenStyles.headerView}></View>),
        headerTintColor: 'white',
        headerTitleStyle: {color: 'white'}
      }}/>
      <Text style={screenStyles.failedToFindBooksText}>Failed to find books</Text>
    </View>
  );
}