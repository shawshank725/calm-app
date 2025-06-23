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

      <View style={{backgroundColor: 'white', padding: 5, borderRadius: 10,}}>
        <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold' , marginVertical: 10,}}>
          Feel. Scribble. Reflect.</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: 'row', gap: 10 }}>
              <TouchableOpacity activeOpacity={0.7} onPress={() => { useRouter().navigate("/(student)/(journal)/digital-doodle");}} >
                <View style={{ width: 300, borderWidth: 3, height: 130, flexDirection: 'row', borderRadius: 10, overflow: 'hidden', backgroundColor: 'white' }}>
                  <View style={{ width: 130, height: '100%', overflow: 'hidden', alignItems: 'center', justifyContent: 'center', borderRightWidth: 3 }}>
                    <Image source={require("assets/images/doodling art.jpg")} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
                  </View>
                  <View style={{ padding: 10, flex: 1 }} >
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Digital Doodle</Text>
                    <Text style={{ fontSize: 13, textAlign: 'justify' }} numberOfLines={4}>
                      Unleash your creativity! Use gestures to sketch, scribble, or just have fun doodling.
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.7} onPress={() => { useRouter().navigate("/(student)/(journal)/journal");}} >
                <View style={{ width: 300, borderWidth: 3, height: 130, flexDirection: 'row', borderRadius: 10, overflow: 'hidden', backgroundColor: 'white' }}>
                  <View style={{ width: 130, height: '100%', overflow: 'hidden', alignItems: 'center', justifyContent: 'center', borderRightWidth: 3 }}>
                    <Image source={require("assets/images/journal.jpg")} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
                  </View>
                  <View style={{ padding: 10, flex: 1 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Journalling</Text>
                    <Text style={{ fontSize: 13, textAlign: 'justify' }} numberOfLines={4}>
                      Reflect on your day, record your thoughts, or simply express yourself in a private and calming space.
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
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
