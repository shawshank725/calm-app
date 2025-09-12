import MyButton from "@/components/MyButton";
import { supabase } from "@/lib/supabase";
import { Link, } from "expo-router";
import { useState } from "react";
import { Alert, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { RadioButton, TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";

import { DEFAULT_PROFILE_PHOTO } from "@/constants/Misc";

export default function SignUpScreen() {

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [professionalTitle, setProfessionalTitle] = useState('');
  const [qualifications, setQualifications] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [role, setRole] = useState<'EXPERT' | 'ADMIN' | null>(null);

  const [loading, setLoading] = useState(false);

  const [secureText, setSecureText] = useState(true);

  const validateData = async () => {
    const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const allRollNumbers = await getAllRollNumbers();

    if (!fullName || !email || !password || !rollNumber || !qualifications || !professionalTitle || !role) {
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
    if (allRollNumbers.includes(rollNumber)) {
      Alert.alert("Roll Number taken", "Roll Number is already taken.");
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

  async function signUpWithEmail() {
    const isValidated = await validateData();
    if (isValidated == false) {
      return false;
    }
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password, });
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
          username: null,
          roll_number: rollNumber,
          full_name: fullName,
          course: null,
          avatar_url: DEFAULT_PROFILE_PHOTO,
          group: role,
          professional_title: professionalTitle,
          qualifications: qualifications,
        });
      console.log(insertError);
      if (insertError) {
        Toast.show({
          type: 'error', // 'success' | 'error' | 'info'
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
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : 'height'}
      style={styles.container} keyboardVerticalOffset={Platform.OS === "ios" ? 70 : 0}  >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.formContainer}>
          <Text style={{ fontWeight: 'bold', fontSize: 30, textAlign: 'center', marginBottom: 20 }}>Sign up</Text>

          <View style={{ display: 'flex', flexDirection: 'row', columnGap: '10' }}>
            <TextInput
              value={fullName}
              onChangeText={setFullName}
              placeholder="Enter your full name"
              mode="outlined"
              style={[styles.input, { flex: 1 }]}
              label="Full Name"
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
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your e-mail address"
              mode="outlined"
              style={[styles.input, { flex: 1 }]}
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
          </View>

          <TextInput
            value={qualifications}
            onChangeText={setQualifications}
            placeholder="Enter your qualifications"
            mode="outlined"
            style={styles.input}
            label="Qualifications"
            outlineStyle={{ borderWidth: 2 }}
            theme={{
              roundness: 10,
              colors: {
                primary: "black",
                outline: "black",
              },
            }}
          />

          <View style={{ display: 'flex', flexDirection: 'row', columnGap: '10' }}>
            <TextInput
              value={rollNumber}
              onChangeText={setRollNumber}
              placeholder="Enter your registration number"
              mode="outlined"
              keyboardType="number-pad"
              style={[styles.input, { flex: 1 }]}
              label="Registration Number"
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
              value={professionalTitle}
              onChangeText={setProfessionalTitle}
              placeholder="Enter professional title"
              mode="outlined"
              style={[styles.input, { flex: 1 }]}
              label="Professional Title"
              outlineStyle={{ borderWidth: 2 }}
              theme={{
                roundness: 10,
                colors: {
                  primary: "black",
                  outline: "black",
                },
              }}
            />
          </View>

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

          <View style={{display:'flex', flexDirection:'row', alignSelf:'center', columnGap:10}}>
            <View style={styles.radioButtonContainer}>
              <RadioButton
                value="EXPERT"
                status={role === 'EXPERT' ? 'checked' : 'unchecked'}
                onPress={() => setRole('EXPERT')}
              />
              <Text>Expert</Text>
            </View>
            <View style={styles.radioButtonContainer}>
              <RadioButton
                value="ADMIN"
                status={role === 'ADMIN' ? 'checked' : 'unchecked'}
                onPress={() => setRole('ADMIN')}
              />
              <Text>Admin</Text>
            </View>
          </View>

          <MyButton
            title={loading ? "Creating account ..." : "Create account"}
            onPress={() => signUpWithEmail()}
            disabled={loading}
          />

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
    marginBottom: 15,
    backgroundColor: '#E1EBEE',
    textDecorationColor: 'none',
  },

  link: {
    color: 'blue',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 20,
  },
  radioButtonContainer: {
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  }
});