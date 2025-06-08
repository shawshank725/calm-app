import { View, Text, Image,  TouchableOpacity, StyleSheet, Pressable } from "react-native";
import { Link, useNavigation, useRouter } from "expo-router";

import React, { useEffect, useLayoutEffect, useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Modal from "react-native-modal";
import { useAuth } from "@/providers/AuthProvider";
import { supabase } from "@/lib/supabase";

const defaultImage = "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg";


type Profile = {
  full_name: string;
  username: string;
  group: string;
  avatar_url?:string;
};

export default function HomeScreen() {

  const navigation = useNavigation();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const {session, loading} = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  
  useEffect(() => {
    const fetchProfile = async () => {
      if (!session) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("username, full_name, group")
        .eq("id", session.user.id)
        .single();

      if (error) {
        console.log("Error fetching profile:", error.message);
      } else {
        setProfile(data);
      }
    };

    fetchProfile();
  }, [session]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            router.push("/info");
          }}
          style={{ marginRight: 16 }}
        >
          <MaterialIcons
          name="info" // <- icon name
          size={28}
          color="green"
          style={{ marginRight: 16 }}
        />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            setOpen(true);
          }}
          style={{ marginLeft: 16 }}
        >
          <MaterialIcons
          name="info" // <- icon name
          size={28}
          color="green"
          style={{ marginLeft: 16 }}
        />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  
  return (
    <View style={styles.container}>

      <Modal
        isVisible={open}
        animationIn="slideInLeft"
        animationOut="slideOutLeft"
        onBackdropPress={() => setOpen(false)}
        backdropOpacity={0.7}
        backdropColor="black"
        useNativeDriver={false}
        hideModalContentWhileAnimating={true}swipeDirection="right"
        onSwipeComplete={() => {setOpen(false); }}
        swipeThreshold={100}
      >
        <View style={{width:'80%',height:'100%', backgroundColor:'#87CEEB', borderRadius: 20,borderWidth: 2,borderColor: 'black', padding: 10,}}>
          <View >
            <View>
              <Image
                  source={{uri: defaultImage}}
                  style={{borderRadius: 20,width: 45,
                    height: 45,
                    borderColor: 'black',
                    borderWidth: 2,}}
                />
            </View>
            <View>
              {session && profile ? (
                <>
                  <Text>Email: {session.user.email}</Text>
                  <Text>Role: {profile.group}</Text>
                  <Text>Full Name: {profile.full_name}</Text>
                  <Text>Username: {profile.username}</Text>
                </>
              ) : (
                <Text>Loading profile...</Text>
              )}
            </View>
          </View>
        </View>
      </Modal>
      <View>
        <View style={styles.row}>
          <Link href={"/(student)/(selfhelp)"}>
            <View style={styles.optionButton}>
              <Image
                source={require("../../../assets/images/self help/notebook.png")}
                style={styles.image}
              />
              <Text style={styles.label}>Self Help ToolKit</Text>
            </View>
          </Link>

          <Link href={"/(student)/(selfhelp)"}>
            <View style={styles.optionButton}>
              <Image
                source={require("../../../assets/images/self help/rainbow.png")}
                style={styles.image}
              />
              <Text style={styles.label}>Calm Kit</Text>
            </View>
          </Link>
        </View>

        <View style={styles.row}>
          <Link href={"/(student)/(selfhelp)"}>
            <View style={styles.optionButton}>
              <Image
                source={require("../../../assets/images/self help/yoga.png")}
                style={styles.image}
              />
              <Text style={styles.label}>Breath & Move Zone</Text>
            </View>
          </Link>

          <Link href={"/(student)/(journal)/digital-doodle"}>
            <View style={styles.optionButton}>
              <Image
                source={require("../../../assets/images/self help/journal.png")}
                style={styles.image}
              />
              <Text style={styles.label}>Journal & Check-ins</Text>
            </View>
          </Link>
        </View>
      </View>


      <Link href="/(student)/buddy" style={{alignSelf: 'center'}} asChild>
        <Pressable>
          <View style={styles.buddyConnect}>
          <Text style={styles.label}>Buddy Connect</Text>
        </View>
        </Pressable>
      </Link>
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
