import NewButton from "@/components/NewButton";
import { supabase } from "@/lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import { Link, router, Stack } from "expo-router";
import { View, Image, Text, Pressable, ImageBackground, TouchableOpacity, Alert, TextInput } from "react-native";
import Toast from "react-native-toast-message";
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing'; 

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
        />
        <Text numberOfLines={1} ellipsizeMode="tail" style={{fontSize: 16, fontWeight: 'bold'}}>{libraryBook.book_name}</Text>
        <Text style={{fontStyle: 'italic'}}>{libraryBook.book_author}</Text>
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
      <Stack.Screen options={{
        title: libraryBook.book_name ,
        headerTitleAlign: 'center',
        headerBackground: () => (
        <ImageBackground source={{ uri: libraryBook.thumbnail_url }}
          resizeMode="cover" style={{flex: 1,  }} blurRadius={70}></ImageBackground>),
        headerTintColor: 'white',
        headerTitleStyle: {color: 'white'}
      }}/>
      
      <Image source={{uri: libraryBook.thumbnail_url}} style={{width:"100%",aspectRatio: 1, resizeMode: 'contain', alignSelf: 'center',}}/>
      <View style={{backgroundColor: 'white', padding: 15, borderRadius: 10, marginVertical: 10}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontWeight:'bold'}}>Written by: </Text>
          <Link href={`/booksByAuthor/${encodeURIComponent(libraryBook.book_author)}`} replace style={{color: 'blue'}}>{libraryBook.book_author}</Link>
        </View>
        <Text style={{fontSize:20, fontWeight: 'bold'}}>Description</Text>
        <Text style={{textAlign: 'justify'}}>{libraryBook.description}</Text>
      </View>
      <NewButton title='View PDF' onPress={() => {router.navigate(`/(student)/(misc)/pdfViewer/${libraryBook.id}`)}}/>
      <View style={{
        backgroundColor: 'white', 
        alignItems: 'center', 
        flexDirection: 'row', 
        justifyContent: 'center', 
        columnGap: 10,
        alignSelf:'center', 
        paddingHorizontal: 20,
        paddingVertical: 10, 
        borderRadius: 10,
      }}>

        <TouchableOpacity activeOpacity={0.7} >
          <Ionicons name="heart-outline" size={30}/>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.7} 
          onPress={async () => {
            
            const fileArray = libraryBook.pdf_url.split("/");
            const size = fileArray.length;
            const fileName = fileArray[size-1];

            const { data, error } = await supabase.storage.from('library-pdfs-thumbnails').download(fileName);
            if (error){
              console.log(error);
              Alert.alert(error.message,"Failed to donwload the PDF");
              return ;
            }

            const result = await FileSystem.downloadAsync(
              libraryBook.pdf_url, FileSystem.documentDirectory + fileName
            );
            Sharing.shareAsync(result.uri);

            Toast.show({
              type: 'success', 
              text1: 'Downloading',
              position: 'bottom', 
              visibilityTime: 1500
            });
        }}>
          <Ionicons name="download-outline" size={30}/>
        </TouchableOpacity>
        
      </View>
    </ImageBackground>
  );
}


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

type SearchBarProps = {
  text: string;
  setText: (text: string) => void;
  onSearch?: () => void;
};

export const LibrarySearchBar = ({ text, setText, onSearch }: SearchBarProps) => {
  return (
    <View style={{flexDirection: 'row', 
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 5,
      alignItems:'center',
      columnGap: 10,
      marginBottom: 10, 
      }}>
      <View style={{flex: 2,flexDirection: 'row', alignItems: 'center', columnGap: 10}}>
      <View style={{flex: 1}}>
        <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Enter book or author name"
        style={{backgroundColor: '#E1EBEE', textDecorationColor: 'none', borderRadius: 10,}}/>
      </View>
      <TouchableOpacity activeOpacity={0.8} onPress={()=> {setText("")}}>
        <Ionicons name="close-circle-outline" size={30} color="green"/>
      </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <NewButton title="Search" onPress={onSearch || (() => {})} />
      </View>
    </View>);
}