import { View,  Text, TextInput, Button, } from "react-native";
import React, { useState } from "react";
import { useAppTheme } from "@/constants/themes/ThemeManager";
import NewButton from "@/components/NewButton";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { supabase } from "@/lib/supabase";
import { decode } from "base64-arraybuffer";
import { useAuth } from "@/providers/AuthProvider";
import Toast from "react-native-toast-message";

type PickedPdf = {
  uri: string;
  name: string;
  mimeType?: string;
  size?: number;
};

export default function PDFTabScreen() {
  const { styles } = useAppTheme();
  const screenStyles = styles.ResourcesPDFScreen;
  const {session, loading} = useAuth();

  const [bookName, setBookName] = useState<string>("");
  const [authorName, setAuthorName] = useState<string>("");
  const [bookPdf, setBookPdf] = useState<PickedPdf | null>(null);
  const [bookDescription, setBookDescription] = useState<string>("");
  const [pageCount, setPageCount] = useState<number | "">("");
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  const addBook = async () => {
    const bookDetails = {
      book_name: bookName,
      book_author: authorName,
      description: bookDescription,
      thumbnail_url: thumbnail,
      pdf_url: bookPdf,
      page_count: pageCount,
    };

    const allFieldsFilled = Object.values(bookDetails).every(
      (value) => value !== null && value !== undefined && value !== ""
    );

    if (allFieldsFilled && (thumbnail && bookPdf)) {
      const thumbnailUploadResult = uploadFile(thumbnail);
      console.log(thumbnailUploadResult);

      const pdfUploadResult = uploadFile(bookPdf.uri);
      console.log("PDF UPLOAD RESULT - " +pdfUploadResult);

      const bookAddedResult = await supabase.from("library").insert(bookDetails).select().single();
      console.log("BOOK ADDED RESULT - " + bookAddedResult);
      if (bookAddedResult.error){
        Toast.show({ type: 'error', text1: 'Failed to add book.',position: 'bottom' });
      }
      else {
        Toast.show({ type: 'success', text1: 'Book successfully added!',position: 'bottom' });
      }
    }
    else {
      Toast.show({ type: 'error', text1: 'All fields are required.',position: 'bottom' });
    }
  }

  const uploadFile = async (uri: string) => {
    if (!uri.startsWith("file://")) return;

    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const fileName = uri.split('/').pop();
    const filePath = `${session!.user.id}/${fileName}`;
    const ext = fileName?.split(".").pop()?.toLowerCase();

    let contentType = "application/octet-stream";
    if (ext === "pdf") {
      contentType = "application/pdf";
    } else if (ext === "png") {
      contentType = "image/png";
    } else if (ext === "jpg" || ext === "jpeg") {
      contentType = "image/jpeg";
    }

    try {
      const { data, error } = await supabase.storage
        .from("library-pdfs-thumbnails")
        .upload(filePath, decode(base64), { contentType });

      if (error) console.log("Upload error:", error);
      else console.log("Upload data:", data);

      return data?.path;
    } catch (e) {
      console.log("Upload exception:", e);
      return null;
    }
  };

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      const img = result.assets[0];
      const localUri = img.uri;
      
      setThumbnail(localUri); 
      
    }
  };

  const selectDoc = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      copyToCacheDirectory: true,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const file = result.assets[0];
      console.log("Picked:", file.uri);

      setBookPdf({
        uri: file.uri,
        name: file.name,
        mimeType: file.mimeType,
        size: file.size,
      });
    }
  };

  return (
    <View style={screenStyles?.container}> 
      <Text>Add a new e-book for the library</Text>

      <View style={screenStyles.rowContainer}>
        <Text style={screenStyles.title}>Book name</Text>
        <TextInput
          editable
          onChangeText={text => setBookName(text)}
          value={bookName}
          style={screenStyles.textInput}
          placeholder="Enter book name"
        />  
      </View>

      <View style={screenStyles.rowContainer}>
        <Text style={screenStyles.title}>Author name</Text>
        <TextInput
          editable
          onChangeText={text => setAuthorName(text)}
          value={authorName}
          style={screenStyles.textInput}
          placeholder="Enter author name"
        />  
      </View>

      <View style={screenStyles.rowContainer}>
        <Text style={screenStyles.title}>Book Description</Text>
        <TextInput
          editable
          onChangeText={text => setBookDescription(text)}
          value={bookDescription}
          style={screenStyles.textInput}
          placeholder="Enter book description"
        />  
      </View>  

      <View style={screenStyles.rowContainer}>
        <Text style={screenStyles.title}>Page Count</Text>
        <TextInput
          editable
          keyboardType="numeric"
          onChangeText={text => setPageCount(Number(text) || 0)}
          value={pageCount ? pageCount.toString() : ""}
          style={screenStyles.textInput}
          placeholder="Enter page count"
        />
      </View>

      <View style={screenStyles.rowContainer}>
        <Text style={screenStyles.title}>{bookPdf === null ? "Select book PDF" :"File selected: " + bookPdf.name}</Text>
        <NewButton title="Select PDF" onPress={selectDoc} />
      </View>
      
      <View style={screenStyles.rowContainer}>
        <Text style={screenStyles.title}>{thumbnail === null ? "Select book thumbnail" : "Image selected" }</Text>
        <NewButton title="Select book thumbnail" onPress={selectImage} />
      </View>

      <NewButton title="Add this book" onPress={addBook}/>
    </View>
  );
}