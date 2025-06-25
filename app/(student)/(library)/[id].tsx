import { Text, } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useGetOneBook } from '@/api/library/Library';
import { CustomActivityIndicator1 } from '@/components/CustomActivityIndicator';
import { BookDetailsContent } from '@/components/library/BookDetailsContent';

const BookDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const {data, error, isLoading} = useGetOneBook(Number(id));
  
  if (isLoading){
    return <CustomActivityIndicator1 />;
  }

  if (error){
    return <Text>Failed to fetch the books</Text>
  }
  return (
    <BookDetailsContent libraryBook={data}/>
  )
}

export default BookDetailsScreen;