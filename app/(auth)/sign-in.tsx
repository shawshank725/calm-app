import { StyleSheet, View, Text, Alert, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from "react-native";
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

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password, });

    if (error) {
      Alert.alert(error.message);
      setLoading(false);
      return false;
    }
    Toast.show({
      type: 'success', // 'success' | 'error' | 'info'
      text1: 'Log in successful',
      position: 'bottom', // or 'bottom'
      visibilityTime: 1500
    });
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : 'height'}
      style={styles.container} keyboardVerticalOffset={Platform.OS === "ios" ? 70 : 60}  >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <View style={styles.formContainer}>
          <Text style={{ fontWeight: 'bold', fontSize: 30, textAlign: 'center', marginBottom: 20 }}>Sign in</Text>

          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your e-mail address"
            mode="outlined"
            style={styles.input}
            label="Email"
            outlineStyle={{ borderWidth: 2 }}
            theme={{
              roundness: 10,
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
            theme={{
              roundness: 10,
              colors: {
                primary: "black",
                outline: "black",
              },
            }}
          />

          <MyButton
            disabled={loading}
            title={loading ? "Signing In..." : "Sign in"}
            onPress={signInWithEmail} />

          <View style={{ display: 'flex', marginTop: 10, rowGap:10 }}>
            <Link href={"/sign-up"} style={styles.link}>New User? Create Account</Link>
            <Link href={"/sign-up-expert-admin"} style={styles.link}>Want to be an expert/admin? Click here</Link>
          </View>
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
    backgroundColor: '#ffffffff'
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
    marginBottom: 10,
    backgroundColor: '#E1EBEE',
    textDecorationColor: 'none',
  },
  link: {
    color: 'blue',
    fontWeight: 'bold',
    display: 'flex',
    textAlign: 'center',
    margin: 1
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});