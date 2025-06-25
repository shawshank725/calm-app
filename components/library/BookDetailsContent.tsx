import { LibraryBookProp } from "@/constants/LibraryData";
import { supabase } from "@/lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import { Stack, Link, router } from "expo-router";
import { ImageBackground, View, TouchableOpacity, Alert, Image, Text} from "react-native";
import Toast from "react-native-toast-message";
import NewButton from "../NewButton";
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing'; 

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
      <NewButton title='View PDF' onPress={() => {router.navigate(`/(student)/(library)/pdfViewer/${libraryBook.id}`)}}/>
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