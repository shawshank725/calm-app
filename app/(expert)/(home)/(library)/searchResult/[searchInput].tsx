import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import { useGetAllBooksAndAuthors } from '@/api/library/Library';
import { CustomActivityIndicator1 } from '@/components/CustomActivityIndicator';
import { LibrarySearchBar } from '@/components/library/LibrarySearchBar';
import { BookCard } from '@/components/library/BookCard';
import { TextAlign } from '@shopify/react-native-skia';

const numColumns = 2;

const SearchInputScreen = () => {
  const {searchInput: previousSearchInput} = useLocalSearchParams();
  const {data, error , isLoading} = useGetAllBooksAndAuthors(String(previousSearchInput));
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();
  const navigation = useNavigation();
  

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Search Results: " + previousSearchInput,
    });
  }, [navigation, previousSearchInput]);

  if (isLoading){
    return <CustomActivityIndicator1 />
  }

  if (error){
    return <Text>Failed to fetch the books</Text>
  }

  return (
    <View style={styles.container}>
      <LibrarySearchBar text={searchInput} setText={setSearchInput} 
        onSearch={() => { router.navigate(`/searchResult/${searchInput}`); }}/>
      
      <Text style={{textAlign: 'center', marginBottom: 10, 
        fontSize: 18,fontWeight: 'bold', 
        backgroundColor: 'yellow', borderRadius: 10}}>Total Records found: {data?.length}</Text>
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
  )
}

export default SearchInputScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightskyblue',
    padding: 10,
    alignSelf: 'stretch', 
  },
});