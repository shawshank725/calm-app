import { View,  Text, TextInput, } from "react-native";
import React, { useState } from "react";
import { useAppTheme } from "@/constants/themes/ThemeManager";

export default function HomeScreen() {
  const { styles } = useAppTheme();
  const screenStyles = styles.ResourcesPDFScreen;

  const [bookName, setBookName] = useState<string>("");
  const [authorName, setAuthorName] = useState<string>("");
  const [bookPdf, setBookPdf] = useState<File | null>(null);
  const [bookDescription, setBookDescription] = useState<string>("");
  const [pageCount, setPageCount] = useState<number | "">("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);

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
    </View>
  );
}