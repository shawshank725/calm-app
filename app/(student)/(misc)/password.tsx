import { View, Text, StyleSheet, Alert, } from 'react-native'
import React, { useState } from 'react'
import NewButton from '@/components/NewButton';
import { TextInput } from 'react-native-paper';
import { supabase } from '@/lib/supabase';
import Toast from 'react-native-toast-message';
import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'expo-router';
import { useAppTheme } from '@/constants/themes/ThemeManager';

export default function PasswordScreen() {
  
  const {styles } = useAppTheme();
  const screenStyles = styles.PasswordScreen;

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const {session, loading} = useAuth();
  const router = useRouter();
  const [passwordSecureText, setpasswordSecureText] = useState(true);
  const [newPasswordSecureText, setNewPasswordSecureText] = useState(true);

  const email = session?.user?.email;

  async function signInWithEmail () {
    if (!email) {
      Alert.alert("Error", "Email not found in session");
      return;
    }

    const {error} = await supabase.auth.signInWithPassword({email, password,});

    if (error) {
      Alert.alert(error.message,"Password entered is incorrect.");
      return;
    }

    const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      Alert.alert("Invalid Password", "Password must include letters, numbers, and special characters.");
      return false;
    }

    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (updateError) {
      Alert.alert("Error", updateError.message);
      return;
    }

    Toast.show({
      type: 'success', // 'success' | 'error' | 'info'
      text1: 'Password updated successfully!',
      position: 'bottom', // or 'bottom'
      visibilityTime: 1500
    });
    setPassword("");
    setNewPassword("");
    router.navigate("/(student)/(home)/settings");
  }

  return (
    <View style={screenStyles.container}>
      <View style={screenStyles.usernameContainer}>
        <Text style={screenStyles.heading}>Change Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Current Password"
          mode="outlined"
          style={screenStyles.input}
          label="Current Password"
          secureTextEntry={passwordSecureText}
          right={
            <TextInput.Icon
              icon={passwordSecureText ? "eye-off" : "eye"}
              onPress={() => setpasswordSecureText(!passwordSecureText)}
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
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="New Password"
          mode="outlined"
          style={screenStyles.input}
          label="New Password"
          secureTextEntry={newPasswordSecureText}
          right={
            <TextInput.Icon
              icon={newPasswordSecureText ? "eye-off" : "eye"}
              onPress={() => setNewPasswordSecureText(!newPasswordSecureText)}
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
        <View style={{alignSelf: 'center'}}>
          <NewButton title='Save password' onPress={() => {signInWithEmail(); }}/>
        </View>
      </View>
    </View>    
  )
};
