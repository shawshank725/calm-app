import { LibraryBookProp } from "@/constants/LibraryData";
import { useAppTheme } from "@/constants/themes/ThemeManager";
import { Link,  } from "expo-router";
import { Image, Text, Pressable  } from "react-native";

export const BookCard = ({ libraryBook }: LibraryBookProp) => {
  const {styles} = useAppTheme()
  const screenStyles = styles.BookCard;

  return (
    <Link href={`/(student)/(library)/${libraryBook.id}`} asChild>
        <Pressable style={screenStyles.pressableCard}>
        <Image
            source={{ uri: libraryBook.thumbnail_url }}
            style={screenStyles.bookImage}
        />
        <Text numberOfLines={1} ellipsizeMode="tail" style={screenStyles.bookNameStyles}>{libraryBook.book_name}</Text>
        <Text style={screenStyles.bookAuthorStyles}>{libraryBook.book_author}</Text>
    </Pressable>
    </Link>
  );
};
