import { StyleSheet, View, Text, Alert } from "react-native";
import { Link } from "expo-router";
import MyButton from "@/components/MyButton";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Toast from "react-native-toast-message";
import { TextInput } from "react-native-paper";

export default function SignInScreen() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [secureText, setSecureText] = useState(true);

  async function signInWithEmail () {
    setLoading(true);
    const {error} = await supabase.auth.signInWithPassword({email, password,});

    if (error) Alert.alert(error.message);
    setLoading(false);

    Toast.show({
      type: 'success', // 'success' | 'error' | 'info'
      text1: 'Log in successful',
      position: 'bottom', // or 'bottom'
      visibilityTime: 1500
    });
  }

  return (
    <View style={styles.container}>
      <Text style={{fontWeight: 'bold', fontSize:30, textAlign: 'center', marginBottom: 20}}>Sign in</Text>

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
      disabled={loading}
      title={loading ? "Signing In..." : "Sign in"} 
      onPress={signInWithEmail}/>
      
      <Link href={"/sign-up"} style={styles.link}>New User? Create Account</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
    display: 'flex',
    textAlign: 'center',
    margin: 20,
  }
});