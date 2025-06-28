import SendButton from "@/components/SendButton";
import React, { useState } from "react";
import {  KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, View ,Text} from "react-native";
import { TextInput } from "react-native-paper";
type Profile = {
  full_name: string;
  username: string;
  group: string;
  avatar_url?:string;
};


const MessageItem = ({ item, }: { item: any; }) => {
  return (
    <View
      style={{
        padding: 10,
        margin: 5,
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 15,
        borderWidth: 2,
        flexDirection: 'row',
      }}
    >
      
        <Text style={{ fontSize: 16 }}>{item.message}</Text>
        {item.created_at && (
          <Text style={{ fontSize: 12, color: 'gray' }}>
            {new Date(item.created_at).toLocaleString()}
          </Text>
        )}
    </View>
  );
};

const Wrapper = Platform.OS === 'ios' ? SafeAreaView : View;

export default function ProfileScreen() {
  
  const [message, setMessage] = useState('');
 
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.select({ ios: 37, android: 140 })}
    >
    <Wrapper style={{flex: 1,}}>
      

      <View style={{flex: 1}}>

        
      </View>

      <View style={styles.inputContainer}>
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message"
            mode="outlined"
            style={styles.input}
            outlineStyle={{ borderWidth: 2 }}
            theme={{
              roundness: 10,
              colors: {
                primary: 'black',
                outline: 'black',
              },
            }}
          />
          <SendButton title="➤"/>
        </View>
      
    </Wrapper>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgb(0, 255, 13)',
        paddingHorizontal: 6,
        paddingVertical: 6,
        marginBottom: Platform.OS === "ios" ? 56: 0,
    },
    input: {
        flex: 1,
        marginRight: 5,
        backgroundColor: 'rgb(255, 252, 86)',
        height: 40,
    },
});