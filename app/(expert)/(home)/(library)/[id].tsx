import { ImageBackground, Text, View, } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { useGetOneBook } from '@/api/library/Library';
import { CustomActivityIndicator1 } from '@/components/CustomActivityIndicator';
import { BookDetailsContent } from '@/components/library/BookDetailsContent';
import { ContentNotFoundText } from '@/components/library/ContentNotFoundText';

const BookDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const {data, error, isLoading} = useGetOneBook(Number(id));
  
  if (isLoading){
    return <CustomActivityIndicator1 />;
  }

  if (error){
    return <ContentNotFoundText book_author={data.book_author} />
  }
  return (
    <View style={{flex: 1}}>   
      <Stack.Screen options={{
        title: data.book_name ,
        headerTitleAlign: 'center',
        headerBackground: () => (
        <ImageBackground source={{ uri: data.thumbnail_url }}
          resizeMode="cover" style={{flex: 1,  }} blurRadius={70}></ImageBackground>),
        headerTintColor: 'white',
        headerTitleStyle: {color: 'white'}
      }}/>
      <BookDetailsContent libraryBook={data}/>
    </View>
  )
}

export default BookDetailsScreen;

