import { View,  StyleSheet, Text, Platform, } from 'react-native';
import React, { useState } from 'react';
import { Stack, useLocalSearchParams, } from 'expo-router';
import { useGetOneBook } from '@/api/library/Library';
import { WebView } from 'react-native-webview';
import { CustomActivityIndicator1 } from '@/components/CustomActivityIndicator';
import { getFileUrl } from '@/api/others';

const PDFViewerScreen = () => {
  const { id } = useLocalSearchParams();
  const { data, error, isLoading } = useGetOneBook(Number(id));

  
  const pdfViewerUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(getFileUrl(data.pdf_url))}`;
  
  if (isLoading) {
    return <CustomActivityIndicator1 />;
  }

  if (error) {return <Text>Failed to fetch the book</Text>;}

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: data.book_name, headerTitleAlign: 'center' }} />
      
      <WebView
        source={{ uri: pdfViewerUrl }}
        style={{ flex: 1, marginBottom: Platform.OS == "android" ? 50: 10,}}
        javaScriptEnabled
        startInLoadingState
      />
    </View>
  ); 

};

export default PDFViewerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
