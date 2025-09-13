import { LibraryBookProp } from "@/constants/LibraryData";
import { LIBRARY_BUCKET } from "@/constants/Misc";
import { useAppTheme } from "@/constants/themes/ThemeManager";
import { supabase } from "@/lib/supabase";
import { Link,  } from "expo-router";
import { Image, Text, Pressable  } from "react-native";

export const BookCard = ({ libraryBook }: LibraryBookProp) => {
  const {styles} = useAppTheme()
  const screenStyles = styles.BookCard;

  const { data: libraryBookThumbnail } = supabase.storage
                .from(LIBRARY_BUCKET)
                .getPublicUrl(libraryBook.thumbnail_url); 

  
  return (
    <Link href={`/(student)/(library)/${libraryBook.id}`} asChild>
        <Pressable style={screenStyles.pressableCard}>
        <Image
            source={{ uri: libraryBookThumbnail.publicUrl }}
            style={screenStyles.bookImage}
        />
        <Text numberOfLines={1} ellipsizeMode="tail" style={screenStyles.bookNameStyles}>{libraryBook.book_name}</Text>
        <Text style={screenStyles.bookAuthorStyles}>{libraryBook.book_author}</Text>
    </Pressable>
    </Link>
  );
};
