import { View, Text , Image, FlatList, TouchableOpacity} from "react-native";
import React from "react";
import { useAppTheme } from "@/constants/themes/ThemeManager";
import { useGetNumberOfBooks } from "@/api/library/Library";
import { useRouter } from "expo-router";
import { getFileUrl } from "@/api/others";
import QuickAccessButton from "@/components/QuickAccessButton";
import { Ionicons } from "@expo/vector-icons";
import { QUICK_ACCESS_BUTTON_ICON_COLOR } from "@/constants/Misc";

export default function HomeScreen() {
  const { styles } = useAppTheme();
  const screenStyles = styles.ExpertHomeScreen;
  const router = useRouter();

  const { data: books, isLoading: booksLoading } = useGetNumberOfBooks(5);

  return (
    <View style={screenStyles?.container}>
      <View style={screenStyles.dashboardCard}>
        <Text style={screenStyles.heading}>Latest E-books</Text>
        <FlatList
          data={books}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={screenStyles.bookContainer}>
              <Image
                src={getFileUrl(item.thumbnail_url)}
                style={screenStyles.dashboardThumbnail}
              />
              <View>
                <Text style={screenStyles.bookNameStyles}>{item.book_name}</Text>
                <Text style={screenStyles.bookAuthorStyles}>{item.book_author}</Text>
              </View>
            </View>
          )}
        />
        <TouchableOpacity onPress={()=> {router.navigate(`/(library)`)}}>
          <View style={screenStyles.viewMoreBooksButton}>
            <Text style={screenStyles.viewMoreBooksButtonText}>View more books</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={screenStyles.quickAccessCard}>
        <Text style={screenStyles.quickAccessHeading}>Quick Access</Text>

        <View style={screenStyles.quickAccessButtonContainer}>
          <QuickAccessButton
            icon={<Ionicons name="calendar" size={22} color={QUICK_ACCESS_BUTTON_ICON_COLOR} />}
            text="Sessions"
            onPress={() => router.navigate(`/(misc)/all-sessions-booked`)}
          />
          <QuickAccessButton
            icon={<Ionicons name="people" size={22} color={QUICK_ACCESS_BUTTON_ICON_COLOR} />}
            text="Buddy Connect"
            onPress={() => router.navigate(`/(misc)/all-sessions-booked`)}
          />
          <QuickAccessButton
            icon={<Ionicons name="book" size={22} color={QUICK_ACCESS_BUTTON_ICON_COLOR} />}
            text="Journal"
            onPress={() => router.navigate(`/(misc)/all-sessions-booked`)}
          />          
          <QuickAccessButton
            icon={<Ionicons name="alert-circle" size={22} color={QUICK_ACCESS_BUTTON_ICON_COLOR} />}
            text="Alert"
            onPress={() => router.navigate(`/(misc)/all-sessions-booked`)}
          />
        </View>
      </View>
    </View>
  );
}
