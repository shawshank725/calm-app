import { View, Text , Image} from "react-native";
import React from "react";
import { useAppTheme } from "@/constants/themes/ThemeManager";
import { Book, useGetThreeBooks } from "@/api/library/Library";
import NewButton from "@/components/NewButton";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { getFileUrl } from "@/api/others";

export default function HomeScreen() {
  const { styles } = useAppTheme();
  const screenStyles = styles.ExpertHomeScreen;
  const router = useRouter();

  const { data: books, isLoading: booksLoading } = useGetThreeBooks();

  return (
    <View style={screenStyles?.container}>
      <View style={screenStyles.dashboardCard}>
        <Text style={screenStyles.heading}>Latest E-books</Text>
        {books?.map((book: Book, index: number) => (
          <View key={index} style={screenStyles.bookContainer}>
            <Image src={getFileUrl(book.thumbnail_url)} style={screenStyles.dashboardThumbnail} />
            <Text style={screenStyles.content}>"{book.book_name}" by {book.book_author}</Text>
            <Text style={screenStyles.content}>Pages: {book.page_count}</Text>
          </View>
        ))}
        <NewButton title="View more books" onPress={()=> {
          router.navigate(`/(library)`)
        }}/>
      </View>

      <View>
        
      </View>
    </View>
  );
}
