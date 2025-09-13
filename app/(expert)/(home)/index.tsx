import { View, Text} from "react-native";
import React from "react";
import { useAppTheme } from "@/constants/themes/ThemeManager";
import { useGetThreeBooks } from "@/api/library/Library";

export default function HomeScreen() {
  const { styles } = useAppTheme();
  const screenStyles = styles.HomeScreen;

  const {data: books, isLoading: booksLoading} = useGetThreeBooks();

  return (
    <View style={screenStyles?.container}> 
      <View>
        <Text>Latest E-books</Text>
        {
          books?.map((book, index)=> (
            <View>
              <Text>{book.book_name}</Text>
            </View>
          ))
        }
      </View>    
    </View>
  );
}
