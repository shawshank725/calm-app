import { LibraryBookProp } from "@/constants/LibraryData";
import { Link,  } from "expo-router";
import { Image, Text, Pressable,  } from "react-native";

export const BookCard = ({ libraryBook }: LibraryBookProp) => {
  return (
    <Link href={`/(student)/(library)/${libraryBook.id}`} asChild>
        <Pressable style={{ backgroundColor: 'white', 
        maxWidth: '50%', 
        borderRadius: 10, 
        alignItems: 'center', 
        padding: 10, flex: 1 }}>
        <Image
            source={{ uri: libraryBook.thumbnail_url }}
            style={{ width: '100%', aspectRatio: 1, borderRadius: 8 }}
        />
        <Text numberOfLines={1} ellipsizeMode="tail" style={{fontSize: 16, fontWeight: 'bold'}}>{libraryBook.book_name}</Text>
        <Text style={{fontStyle: 'italic'}}>{libraryBook.book_author}</Text>
    </Pressable>
    </Link>
  );
};
