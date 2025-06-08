import { useInsertMessage, useMessageList } from '@/api/messenger/BuddyConnectMessaging';
import MyButton from '@/components/MyButton';
import SendButton from '@/components/SendButton';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList, Button, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import {  TextInput } from 'react-native-paper';

const BuddyConnect = () => {
  
  const {data, error, isLoading, refetch} = useMessageList();
  const [message, setMessage] = useState('');
  const {mutate: insertMessage} = useInsertMessage();
  const {session, loading} = useAuth();

  useEffect(() => {
    const channel = supabase
      .channel('buddy_messages_channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'buddy_messages' },
        (payload) => {
          refetch(); // refresh messages on insert
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refetch]);

  
  if (isLoading){
    return <ActivityIndicator />
  }

  if (error ){
    return <Text>Failed to load messages</Text>
  }

  const sendMessage = () => {
    if (message.trim() === '') return; // no empty messages

    insertMessage({ content: message, userId:session!.user.id }); // pass real userId here
    setMessage(''); // clear input after sending
  };

  return (
    <View style={{flex: 1,    backgroundColor: '#B9D9EB', }}>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()} // unique key for each item
        renderItem={({ item }) => (
          <View style={{ padding: 10, marginHorizontal: 10,marginVertical: 5, 
            backgroundColor:item.user_id === session!.user.id ? '#D0F0C0' : 'white',
            maxWidth: 300 ,
            borderRadius: 15, 
            borderWidth: 2,
            alignSelf: item.user_id === session!.user.id ? 'flex-end' : 'flex-start'}}>
            <Text style={{ fontSize: 16 }}>{item.message}</Text>
            {item.created_at && (
              <Text style={{ fontSize: 12, color: 'gray' }}>
                {new Date(item.created_at).toLocaleString()}
              </Text>
            )}
          </View>
        )}
        style={{marginBottom: 80,}}
      />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        keyboardVerticalOffset={Platform.OS === 'ios' ?60: 50}  style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.boxContainer}>
            <TextInput
              value={message}
              onChangeText={text => setMessage(text)}
              placeholder="Enter message"
              mode="outlined"
              label="Message"
              style={styles.input}
              outlineStyle={{ borderWidth: 2 }}
              theme={{roundness: 10, 
                colors: {
                  primary: "black",
                  outline: "black",
                },
              }}
            />
            <SendButton title='➤' onPress={sendMessage}/>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default BuddyConnect;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B9D9EB',
    padding: 10,
    display: 'flex',
  },
  input: {
    marginBottom: 25,
    marginTop: 15,
    backgroundColor: '#E1EBEE',
    textDecorationColor: 'none',
    marginRight: 10,
    width: '85%', 
    justifyContent: 'center',
  },
  boxContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
    width: '100%',
    height: 120, 
    position: 'absolute', // Keeps it fixed at the bottom
    bottom: 1, // Positions it at the bottom of the screen
    left: 10,
    padding: 10 // Adds some space around the input for better usability
  },
 
});