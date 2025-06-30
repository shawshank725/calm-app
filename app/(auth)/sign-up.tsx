import { StyleSheet, View, Text,  Alert, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Link, } from "expo-router";
import MyButton from "@/components/MyButton";
import { useState } from "react";
import {supabase} from "@/lib/supabase";
import { TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";

import getAllUsernames from "@/api/profile/Profile";

export default function SignUpScreen() {

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [course, setCourse] = useState('');
  const [username, setUsername] = useState('');
  
  const [loading, setLoading] = useState(false);
  
  const [secureText, setSecureText] = useState(true);

  const validateData = async() => {
    const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const allUsernames = await getAllUsernames();
    const allRollNumbers = await getAllRollNumbers();

    if (!fullName || !email || !password || !rollNumber || !username) {
      Alert.alert("All fields are required.");
      return false;
    }

    if (password.length < 8) {
      Alert.alert("Password too short", "Password must be at least 8 characters.");
      return false;
    }

    if (!passwordRegex.test(password)) {
      Alert.alert("Invalid Password", "Password must include letters, numbers, and special characters.");
      return false;
    }

    if (!emailRegex.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return false;
    }

    if (allUsernames.includes(username)) {
      Alert.alert("Username taken","Username is already taken. Try another one.");
      return false;
    }
    if (allRollNumbers.includes(rollNumber)) {
      Alert.alert("Roll Number taken","Roll Number is already taken.");
      return false;
    }
    return true;
  };


  const getAllRollNumbers = async () => {
    const { data, error } = await supabase.from("profiles").select("roll_number");
    if (error) {
      return [];
    }
    const rollNumbers = data.map((user) => user.roll_number);
    return rollNumbers;
  }

  async function signUpWithEmail () {
    const isValidated = await validateData();
    if (isValidated == false){
      return false;
    }
    setLoading(true);
    const {data, error} = await supabase.auth.signUp({email, password,});
    if (error) {
      Alert.alert("Error", error.message);
      setLoading(false);
      return;
    }

    const user = data.user;
    if (user) {
      const { error: insertError } = await supabase
        .from("profiles")
        .insert({
          id: user.id, 
          username: username,
          roll_number: rollNumber,
          full_name: fullName, 
          group: "STUDENT", 
        });

      if (insertError) {
        Toast.show({
          type: 'success', // 'success' | 'error' | 'info'
          text1: 'Account creation unsuccessful',
          position: 'bottom', // or 'bottom'
          visibilityTime: 1500
        });
      } 
      else {
        Toast.show({
          type: 'success', // 'success' | 'error' | 'info'
          text1: 'Account creation successful',
          position: 'bottom', // or 'bottom'
          visibilityTime: 1500
        });
      }
    } 
    setLoading(false);
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS ==="ios" ? "padding" : 'height'} 
      style={styles.container} keyboardVerticalOffset={Platform.OS ==="ios" ? 70 :60}  >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.formContainer}>
          <Text style={{fontWeight: 'bold', fontSize:30, textAlign: 'center', marginBottom: 20}}>Sign up</Text>

          <TextInput
            value={fullName}
            onChangeText={setFullName}
            placeholder="Enter your full name"
            mode="outlined"
            style={styles.input}
            label="Full Name"
            outlineStyle={{ borderWidth: 2 }}
            theme={{roundness: 10, 
              colors: {
                primary: "black",
                outline: "black",
              },
            }}
          />

          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your e-mail address"
            mode="outlined"
            style={styles.input}
            label="Email"
            outlineStyle={{ borderWidth: 2 }}
            theme={{roundness: 10, 
              colors: {
                primary: "black",
                outline: "black",
              },
            }}
          />

              <TextInput
              value={rollNumber}
              onChangeText={setRollNumber}
              placeholder="Enter your registration number"
              mode="outlined"
              keyboardType="number-pad"
              style={styles.input}
              label="Registration Number"
              outlineStyle={{ borderWidth: 2 }}
              theme={{roundness: 10, 
                colors: {
                  primary: "black",
                  outline: "black",
                },
              }}
            />

          <TextInput
            value={course}
            onChangeText={setCourse}
            placeholder="Enter your Course"
            mode="outlined"
            style={styles.input}
            label="Course"
            outlineStyle={{ borderWidth: 2 }}
            theme={{roundness: 10, 
              colors: {
                primary: "black",
                outline: "black",
              },
            }}
          />

          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="Enter a unique username"
            mode="outlined"
            style={styles.input}
            label="Username"
            outlineStyle={{ borderWidth: 2 }}
            theme={{roundness: 10, 
              colors: {
                primary: "black",
                outline: "black",
              },
            }}
          />

          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder=""
            mode="outlined"
            label="Password"
            style={styles.input}
            secureTextEntry={secureText}
            right={
              <TextInput.Icon
                icon={secureText ? "eye-off" : "eye"}
                onPress={() => setSecureText(!secureText)}
              />
            }
            outlineStyle={{ borderWidth: 2 }}
            theme={{roundness: 10, 
              colors: {
                primary: "black",
                outline: "black",
              },
            }}
          />
          
          <MyButton 
            title= {loading ? "Creating account ..." : "Create account"}
            onPress={() => signUpWithEmail()} 
            disabled={loading}/>
          
          <Link href={"/sign-in"} style={styles.link}>Already a User? Login</Link>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#0d031b'
  },
  formContainer: {
    justifyContent: 'center', 
    marginBottom: 50, 
    backgroundColor: 'white', 
    padding: 20, 
    borderRadius: 10,  
    elevation: 10, 
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#E1EBEE',
    textDecorationColor: 'none',
    //fontWeight: 'bold'
  },

  link : {
    color: 'blue',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 20,
  }
});