import { View, FlatList } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useGetAllBooksByAuthor } from '@/api/library/Library';
import { CustomActivityIndicator1 } from '@/components/CustomActivityIndicator';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { BookCard } from '@/components/library/BookCard';
import { ContentNotFoundText } from '@/components/library/ContentNotFoundText';

const numColumns = 2;

const AuthorBooksScreen = () => {
    const { book_author } = useLocalSearchParams();
    const decodedAuthor = decodeURIComponent(String(book_author));
    const {data, error, isLoading} = useGetAllBooksByAuthor(decodedAuthor);
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
        title: decodedAuthor,
        });
    }, [navigation, decodedAuthor]);
  
    if (isLoading){
        return <CustomActivityIndicator1 />
    }

    if (error){
        return <ContentNotFoundText book_author={decodedAuthor}/>
    }
    
    return (
        <View style={{flex: 1, backgroundColor: 'lightskyblue',  padding: 10,}}>
            
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

export default AuthorBooksScreen;