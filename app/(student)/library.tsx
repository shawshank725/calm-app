import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import React from 'react';
import { Linking } from 'react-native';



const LibraryScreen = () => {
  return (
    <>
      <ScrollView style={styles.container}>
        <View>
          <TouchableOpacity 
            activeOpacity={0.7}
            onPress={() => Linking.openURL("http://1.6.136.107/")}
          >
            <Text style={styles.linkText}>Go to SGT University's E-Library</Text>
          </TouchableOpacity>

          <Text>Here you can view the pdfs related to self help.</Text>

          <View>
            <View></View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default LibraryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightskyblue',
    padding: 10,
    alignSelf: 'stretch', // Better than alignItems in ScrollView container
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
  }
});
