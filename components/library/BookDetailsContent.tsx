import { LibraryBookProp } from "@/constants/LibraryData";
import { supabase } from "@/lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import { Link, router, useNavigation } from "expo-router";
import { ImageBackground, View, TouchableOpacity, Alert, Image, Text, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";
import NewButton from "../NewButton";
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { useEffect } from "react";
import { useAppTheme } from "@/constants/themes/ThemeManager";
import { LIBRARY_BUCKET } from "@/constants/Misc";

export const BookDetailsContent = ({ libraryBook }: LibraryBookProp) => {
  const navigation = useNavigation();
  const { styles } = useAppTheme();
  const screenStyles = styles.BookDetailsContent;

  const { data: libraryBookThumbnail } = supabase.storage
    .from(LIBRARY_BUCKET)
    .getPublicUrl(libraryBook.thumbnail_url);

  useEffect(() => {
    navigation.setOptions({
      title: libraryBook.book_name,
      headerTitleAlign: 'center',
      headerBackground: () => (
        <ImageBackground
          source={{ uri: libraryBookThumbnail.publicUrl }}
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
      source={{ uri: libraryBookThumbnail.publicUrl }}
      resizeMode="cover"
      style={screenStyles.imageBackgroundStyles}
      blurRadius={40}
    >
      <Image source={{ uri: libraryBookThumbnail.publicUrl }} style={screenStyles.bookThumbnailPhoto} />
      <View style={screenStyles.bookInformationContainer}>

        <View style={{ flexDirection: 'row' }}>
          <Text style={screenStyles.writtenByText}>Written by: </Text>
          <Link href={`/booksByAuthor/${encodeURIComponent(libraryBook.book_author)}`} replace style={screenStyles.authorNameLink}>{libraryBook.book_author}</Link>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text style={screenStyles.pageCountText}>Page count: </Text>
          <Text>{libraryBook.page_count}</Text>
        </View>

        <Text style={screenStyles.descriptionText}>Description</Text>
        <Text style={screenStyles.description}>{libraryBook.description}</Text>
      </View>
      <NewButton title='View PDF' onPress={() => { router.navigate(`/(student)/(library)/pdfViewer/${libraryBook.id}`) }} />
      <View style={screenStyles.extraOptionsContainer}>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={async () => {
            try {
              const filePath = libraryBook.pdf_url; // full path in bucket

              const { data, error } = await supabase
                .storage
                .from(LIBRARY_BUCKET)
                .download(filePath);

              if (error) throw error;
              if (!data) throw new Error('No file returned from Supabase.');

              const baseDir = FileSystem.documentDirectory;
              if (!baseDir) throw new Error('No writable document directory.');

              const filename = filePath.split('/').pop() ?? 'file.pdf';
              const localUri = baseDir + filename;

              // Convert Blob -> base64 string
              const reader = new FileReader();
              reader.onload = async () => {
                try {
                  const base64 = (reader.result as string).split(',')[1];
                  await FileSystem.writeAsStringAsync(localUri, base64, {
                    encoding: FileSystem.EncodingType.Base64,
                  });
                  await Sharing.shareAsync(localUri);
                  Toast.show({
                    type: 'success',
                    text1: 'PDF ready to share',
                    position: 'bottom',
                    visibilityTime: 1500,
                  });
                } catch (writeErr: any) {
                  Alert.alert('Save failed', writeErr.message);
                }
              };
              reader.readAsDataURL(data);
            } catch (err: any) {
              Alert.alert('Download failed', err.message);
            }
          }}
        >
          <Ionicons name="download-outline" size={30} />
        </TouchableOpacity>

      </View>
    </ImageBackground>
  );
}
