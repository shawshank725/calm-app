import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { BookCard, LibrarySearchBar } from '@/constants/LibraryData';
import { useGetAllBooks } from '@/api/library/Library';
import { CustomActivityIndicator1 } from '@/components/CustomActivityIndicator';
import { useRouter } from 'expo-router';

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
      onSearch={() => { router.navigate(`/searchResult/${searchInput}`); }}/>

      {/* <TouchableOpacity 
        activeOpacity={0.7}
        onPress={() => Linking.openURL("http://1.6.136.107/")}
      >
        <Text style={styles.linkText}>Go to SGT University's E-Library</Text>
      </TouchableOpacity> */}

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
  linkText: {
    fontSize: 17,
    fontWeight: 'bold',
    borderRadius: 10,
    borderWidth: 2,
    color: 'blue',
    padding: 10,
    textAlign: 'center',
    backgroundColor: 'yellow',
  },
  input: {
    
  },
});
