import { useInsertMessage, useMessageList } from '@/api/messenger/BuddyConnectMessaging';
import MyButton from '@/components/MyButton';
import SendButton from '@/components/SendButton';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList, KeyboardAvoidingView, ActivityIndicator, Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';
import {  TextInput } from 'react-native-paper';
//import {  TextInput } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#B9D9EB' }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={90}
        >
          <View style={styles.container}>
            <FlatList
              data={data}
              keyboardShouldPersistTaps="handled"
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View
                  style={{
                    padding: 10,
                    flexGrow: 1, 
                    margin: 5,
                    backgroundColor: item.user_id === session!.user.id ? '#D0F0C0' : 'white',
                    maxWidth: '80%',
                    borderRadius: 15,
                    borderWidth: 2,
                    alignSelf: item.user_id === session!.user.id ? 'flex-end' : 'flex-start'
                  }}
                >
                  <Text style={{ fontSize: 16 }}>{item.message}</Text>
                  {item.created_at && (
                    <Text style={{ fontSize: 12, color: 'gray' }}>
                      {new Date(item.created_at).toLocaleString()}
                    </Text>
                  )}
                </View>
              )}
              contentContainerStyle={{ paddingBottom: 10 , flexGrow: 1,}}
            />

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
              <SendButton title="➤" onPress={sendMessage} />
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default BuddyConnect;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 0, 0, 0.43)',
    paddingHorizontal: 6,
    paddingVertical: 6,

  },
  input: {
    flex: 1,
    marginRight: 5,
    backgroundColor: 'rgb(255, 252, 86)',
    height: 40,
  },
});