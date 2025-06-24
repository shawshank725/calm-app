import NewButton from "@/components/NewButton";
import { Link, router, Stack } from "expo-router";
import { View, Image, Text, Pressable, ImageBackground } from "react-native";

export type LibraryBook = {
  id: number;
  thumbnail_url: string;
  book_name: string;
  book_author: string;
  pdf_url: string;
  description: string,
};

export type LibraryBookProp = {
  libraryBook: LibraryBook;
};

export const BookCard = ({ libraryBook }: LibraryBookProp) => {
  return (
    <Link href={`/(student)/(misc)/${libraryBook.id}`} asChild>
        <Pressable style={{ backgroundColor: 'white', 
        maxWidth: '50%', 
        borderRadius: 10, 
        alignItems: 'center', 
        padding: 10, flex: 1 }}>
        <Image
            source={{ uri: libraryBook.thumbnail_url }}
            style={{ width: '100%', aspectRatio: 1, borderRadius: 8 }}
           // resizeMode="contain"
        />
        <Text>{libraryBook.book_name}</Text>
        <Text>{libraryBook.book_author}</Text>
    </Pressable>
    </Link>
  );
};

export const BookDetailsContent = ({ libraryBook }: LibraryBookProp) => {
  return (
    <ImageBackground
      source={{ uri: libraryBook.thumbnail_url }}
      resizeMode="cover"
      style={{flex: 1, padding: 10, }}
      blurRadius={40}
    >
      <Stack.Screen options={{title: libraryBook.book_name , headerTitleAlign: 'center',}}/>
      
      <Image source={{uri: libraryBook.thumbnail_url}} style={{width:"100%",aspectRatio: 1, resizeMode: 'contain', alignSelf: 'center',}}/>
      <View style={{backgroundColor: 'white', padding: 15, borderRadius: 10, marginVertical: 10}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontWeight:'bold'}}>Written by: </Text>
          <Text>{libraryBook.book_author}</Text>
        </View>
        <Text style={{fontSize:20, fontWeight: 'bold'}}>Description</Text>
        <Text style={{textAlign: 'justify'}}>{libraryBook.description}</Text>
      </View>
      <NewButton title='View PDF' onPress={() => {router.navigate(`/(student)/(misc)/pdfViewer/${libraryBook.id}`)}}/>
      <NewButton title='View more books by this author'/>
    </ImageBackground>
  );
}
