import { View, Text, Image,  TouchableOpacity, StyleSheet, ScrollView, useWindowDimensions } from "react-native";
import { useRouter } from "expo-router";

import React, { useEffect,  useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { supabase } from "@/lib/supabase";
import { useProfilePhoto } from "@/api/profile/Profile";


type Profile = {
  full_name: string;
  username: string;
  group: string;
  avatar_url?:string;
};

export default function HomeScreen() {

  return (
    <View style={styles.container}> 
      
      <TouchableOpacity onPress={() => { useRouter().navigate("/(student)/(misc)/library");}} activeOpacity={0.5}> 
        <View style={{borderRadius: 20,overflow: 'hidden', marginVertical: 10, borderWidth: 3,backgroundColor: 'white'}}>
          <View style={{width: '100%', height: 150 ,borderBottomWidth: 3,}}>
            <Image source={require("assets/images/library-card-photo.jpg")} style={{width: '100%',height: '100%',  }}/>
          </View>
          <View style={{padding: 10,}}>
            <Text style={{fontSize: 25,fontWeight: 'bold'}}>The Support Shelf</Text>
            <Text style={{color: 'grey'}}>Explore self-help books and inspiring stories to guide your growth.</Text>
          </View>
        </View>
      </TouchableOpacity>
      
    </View>
  );
}

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
