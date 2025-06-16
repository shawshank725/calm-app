import { View, StyleSheet, } from "react-native";
import React, { useState } from 'react';

const DigitalDoodle = () => {
  const [paths, setPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);
  const [isClearButtonClicked, setClearButtonClicked] = useState(false);

  

  return (
    <View style={styles.container} >
      
    </View>
  );
};
export default DigitalDoodle;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#B9D9EB",
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly", // centers buttons in the row with space
    alignItems: "center",
    marginTop: 20,
  },
  optionButton: {
    width: 160,
    height: 200, // Enough to fit image and text
    backgroundColor: "#4169E1",
    borderRadius: 20,
    borderWidth: 3,
    padding: 10,
    justifyContent: "center",
    alignItems: "center", // center content horizontally
  },
  image: {
    width: 140,
    height: 140,
    marginBottom: 10,
  },
  label: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  profilePhoto: {
    borderRadius: 40,
    maxWidth: 35,
    maxHeight: 35,
    borderColor: 'black',
    borderWidth: 2,
  },
  headerBar: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  center: {
    fontWeight: 'bold',
    fontSize: 20
  },
  left:{
    fontWeight: 'bold',
  },
  buddyConnect: {
    borderRadius: 20, 
    borderWidth: 3, 
    width: 150, 
    backgroundColor: "#4169E1",
    alignSelf: 'center', 
    marginVertical: 20, 
    padding: 10,}
});
