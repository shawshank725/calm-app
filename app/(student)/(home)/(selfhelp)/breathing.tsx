import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { ViewComponent } from 'react-native';

const CBTExercises = () => {
  return (
    <View></View>
  )
}

export default CBTExercises;

const styles = StyleSheet.create({
  toolsHeading : {
    marginVertical: 15,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scrollContainer: {
    padding: 10,
    backgroundColor: "#B9D9EB",
    paddingBottom: 40,
    flexGrow: 1,
  },
  allTools: {
    display: 'flex', 
    flexDirection:'row', 
    justifyContent: 'space-between',
    marginBottom: 10,
  },  
  boxContainer: {
    alignSelf: 'flex-start',
    overflow:'hidden', 
    backgroundColor: '#4682B4',  
    alignItems:"center", 
    borderRadius: 20,
    width: 178,
    height: 210, 
    borderWidth: 3,
  },
  image : {
    maxWidth: 80,
    maxHeight: 80,
  },
  imageContainer: {
    backgroundColor: '#AFEEEE',
    width: '100%',
    height: 90,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent:'center',
    borderBottomWidth: 3,
  },
  heading: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
  },
  description: {
    color: 'yellow',
    textAlign: 'left',
  },
});