import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function PasswordScreen() {
  return (
    <View>
      <Text>PasswordScreen</Text>
    </View>

    
  )
}


const textBoxStyles = StyleSheet.create({
  input: {
    marginBottom: 10,
    backgroundColor: '#E1EBEE',
    textDecorationColor: 'none',
  },
  usernameContainer: {
    backgroundColor: 'white', 
    padding: 10, 
    marginVertical: 10, 
    borderRadius: 10,
  },
  heading: {
    fontWeight: 'bold', 
    fontSize: 20,
    marginBottom: 10
  },


});