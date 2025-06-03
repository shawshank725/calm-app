import { StyleSheet, View, Text, TextInput, Alert } from "react-native";
import { Link } from "expo-router";
import MyButton from "@/components/MyButton";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SignInScreen() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail () {
    setLoading(true);
    const {error} = await supabase.auth.signInWithPassword({email, password,});

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Text>This is sign in screen</Text>

      <Text>Email</Text>
      <TextInput  value={email}
        onChangeText={setEmail}
        placeholder="jon@gmail.com"
        style={styles.input}/>

      <Text>Password</Text>
      <TextInput  value={password}
        onChangeText={setPassword}
        placeholder=""
        style={styles.input}
        secureTextEntry/>

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
    backgroundColor: "white",
    flex: 1,
  },
  input: {
    borderWidth: 3,
    borderColor: 'black',
    marginBottom: 10,
    borderRadius: 10,
  },
  link : {
    color: 'blue',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  }
});