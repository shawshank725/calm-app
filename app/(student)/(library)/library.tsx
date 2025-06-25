import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import React, { useState } from 'react';
import { useGetAllBooks } from '@/api/library/Library';
import { CustomActivityIndicator1 } from '@/components/CustomActivityIndicator';
import { useRouter } from 'expo-router';
import { BookCard } from '@/components/library/BookCard';
import { LibrarySearchBar } from '@/components/library/LibrarySearchBar';
import { SGTLibraryLink } from '@/components/library/SGTLibraryLink';

const numColumns = 2;

const LibraryScreen = () => {

  const {data, error, isLoading} = useGetAllBooks();
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();
  
  if (isLoading){
    return <CustomActivityIndicator1 />
  }

  if (error){
    return <Text>Failed to fetch the books</Text>
  }


  return (
    <View style={styles.container}>
      
      <LibrarySearchBar text={searchInput} setText={setSearchInput} 
      onSearch={() => { if (searchInput) router.navigate(`/searchResult/${searchInput}`); }}/>

      <SGTLibraryLink />

      <View>
        <FlatList
          key={numColumns} 
          data={data}
          keyExtractor={(item) => item.id.toString()}
          numColumns={numColumns}
          renderItem={({ item }) => (<BookCard libraryBook={item} /> )}
          contentContainerStyle={{ gap: 10, paddingBottom: 20,  }}
          columnWrapperStyle={{gap: 10,}}
        />
      </View>
    </View>
  );
};

export default LibraryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightskyblue',
    padding: 10,
    alignSelf: 'stretch', 
  },
});
