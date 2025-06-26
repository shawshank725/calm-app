import { LibraryBookProp } from "@/constants/LibraryData";
import { supabase } from "@/lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import {  Link, router, useNavigation } from "expo-router";
import { ImageBackground, View, TouchableOpacity, Alert, Image, Text, StyleSheet} from "react-native";
import Toast from "react-native-toast-message";
import NewButton from "../NewButton";
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing'; 
import { useEffect } from "react";
import { useAppTheme } from "@/constants/themes/ThemeManager";

export const BookDetailsContent = ({ libraryBook }: LibraryBookProp) => {
  const navigation = useNavigation();
  const {styles } = useAppTheme();
  const screenStyles = styles.BookDetailsContent;

  useEffect(() => {
    navigation.setOptions({
      title: libraryBook.book_name,
      headerTitleAlign: 'center',
      headerBackground: () => (
        <ImageBackground
          source={{ uri: libraryBook.thumbnail_url }}
          resizeMode="cover"
          style={{ flex: 1 }}
          blurRadius={70}
        />
      ),
      headerTintColor: 'white',
      headerTitleStyle: { color: 'white' },
    });
  }, [libraryBook]);

  
  return (
    <ImageBackground
      source={{ uri: libraryBook.thumbnail_url }}
      resizeMode="cover"
      style={screenStyles.imageBackgroundStyles}
      blurRadius={40}
    >      
      <Image source={{uri: libraryBook.thumbnail_url}} style={screenStyles.bookThumbnailPhoto}/>
      <View style={screenStyles.bookInformationContainer}>

        <View style={{flexDirection: 'row'}}>
          <Text style={screenStyles.writtenByText}>Written by: </Text>
          <Link href={`/booksByAuthor/${encodeURIComponent(libraryBook.book_author)}`} replace style={screenStyles.authorNameLink}>{libraryBook.book_author}</Link>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Text style={screenStyles.pageCountText}>Page count: </Text>
          <Text>{libraryBook.page_count}</Text>
        </View>
        
        <Text style={screenStyles.descriptionText}>Description</Text>
        <Text style={screenStyles.description}>{libraryBook.description}</Text>
      </View>
      <NewButton title='View PDF' onPress={() => {router.navigate(`/(student)/(library)/pdfViewer/${libraryBook.id}`)}}/>
      <View style={screenStyles.extraOptionsContainer}>

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
              Alert.alert(error.message,"Failed to donwload the PDF");
              return ;
            }

            const result = await FileSystem.downloadAsync(
              libraryBook.pdf_url, FileSystem.documentDirectory + fileName
            );
            Sharing.shareAsync(result.uri);
            Toast.show({ type: 'success', text1: 'Downloading', position: 'bottom', visibilityTime: 1500});
        }}>
          <Ionicons name="download-outline" size={30}/>
        </TouchableOpacity>
        
      </View>
    </ImageBackground>
  );
}
