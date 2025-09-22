import { View, Text , Image} from "react-native";
import React from "react";
import { useAppTheme } from "@/constants/themes/ThemeManager";
import { Book, useGetThreeBooks } from "@/api/library/Library";
import NewButton from "@/components/NewButton";
import { useRouter } from "expo-router";
import { getFileUrl } from "@/api/others";
import QuickAccessButton from "@/components/QuickAccessButton";
import { Ionicons } from "@expo/vector-icons";
import { QUICK_ACCESS_BUTTON_ICON_COLOR } from "@/constants/Misc";

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
        <Text>view sessions booked by students</Text>
        <NewButton title="view all Sessions" onPress={()=> {
          router.navigate(`/(misc)/all-sessions-booked`);
        }}/>
      </View>
      <View style={screenStyles.quickAccessCard}>
        <Text style={screenStyles.quickAccessHeading}>Quick Access</Text>
        <View style={screenStyles.quickAccessButtonContainer}>
          <QuickAccessButton
            icon={<Ionicons name="calendar" size={22} color={QUICK_ACCESS_BUTTON_ICON_COLOR} />}
            text="Sessions"
            onPress={() => router.navigate(`/(misc)/all-sessions-booked`)}
          />
        </View>
      </View>
    </View>
  );
}
