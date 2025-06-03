import { StyleSheet, View, Text,  Alert } from "react-native";
import { Link, useRouter } from "expo-router";
import MyButton from "@/components/MyButton";
import { useState } from "react";
import {supabase} from "@/lib/supabase";
import { TextInput } from "react-native-paper";

export default function SignUpScreen() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [username, setUsername] = useState('');
  
  const [loading, setLoading] = useState(false);
  
  const [secureText, setSecureText] = useState(true);

  async function signUpWithEmail () {
    setLoading(true);
    const {error} = await supabase.auth.signUp({email, password,});

    if (error) Alert.alert(error.message);
    setLoading(false);
  }
  return (
    <View style={styles.container}>
      <Text style={{fontWeight: 'bold', fontSize:30, textAlign: 'center', marginBottom: 20}}>Sign up</Text>

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
        placeholder="Enter your roll number"
        mode="outlined"
        style={styles.input}
        label="Roll Number"
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

      <TextInput
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder=""
        mode="outlined"
        label="Confirm Password"
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
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
    flex: 1,
  },
  input: {
    marginBottom: 25,
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