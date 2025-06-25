import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const SearchInputScreen = () => {

  const {searchInput} = useLocalSearchParams();
  return (
    <View style={{flex: 1}}>
      
      <Text>{searchInput}</Text>
    </View>
  )
}

export default SearchInputScreen;