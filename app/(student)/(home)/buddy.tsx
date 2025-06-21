import { useInsertMessage, useMessageList } from '@/api/messenger/BuddyConnectMessaging';
import { useProfilePhoto } from '@/api/profile/Profile';
import SendButton from '@/components/SendButton';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';
import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react';
import { Image, View, StyleSheet, Text, FlatList, KeyboardAvoidingView, ActivityIndicator, Platform, TouchableOpacity, SafeAreaView } from 'react-native';
import {  TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const Wrapper = Platform.OS === 'ios' ? SafeAreaView : View;

const MessageItem = ({ item, isCurrentUser }: { item: any; isCurrentUser: boolean }) => {
  const { data: photoUrl } = useProfilePhoto(item.user_id);

  return (
    <View
      style={{
        padding: 10,
        margin: 5,
        backgroundColor: isCurrentUser ? '#D0F0C0' : 'white',
        maxWidth: '80%',
        borderRadius: 15,
        borderWidth: 2,
        flexDirection: 'row',
        alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
      }}
    >
      { photoUrl && (
        <Image source={{ uri: photoUrl }} style={styles.profilePhoto} />
      )}
      <View style={{flexShrink: 1}}>
        <Text style={{ fontSize: 16 }}>{item.message}</Text>
        {item.created_at && (
          <Text style={{ fontSize: 12, color: 'gray' }}>
            {new Date(item.created_at).toLocaleString()}
          </Text>
        )}
      </View>
    </View>
  );
};

const BuddyConnect = () => {
  
  const {data, error, isLoading, refetch} = useMessageList();
  const [message, setMessage] = useState('');
  const {mutate: insertMessage} = useInsertMessage();
  const {session, loading} = useAuth();
  const [showDownButton, setShowDownButton] = useState(true);
  const flatListRef = useRef<FlatList>(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [data]); // scroll every time new message is added

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
  if (message.trim() === '') return;

  const tempMessage = {
    id: Date.now(), // temporary unique ID
    message,
    user_id: session!.user.id,
    created_at: new Date().toISOString(),
    // any other fields your MessageItem expects
  };

  queryClient.setQueryData(['messages'], (oldData: any) => [...(oldData || []), tempMessage]);
  insertMessage({ content: message, userId: session!.user.id });
  setMessage('');
};

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.select({ ios: 37, android: 90 })}
    >
    <Wrapper style={{flex: 1,}}>
      <View style={styles.container}>
        
        <FlatList
          data={data}
          ref={flatListRef}
          onScroll={({ nativeEvent }) => {
            const paddingToBottom = 20;
            const isAtBottom =
              nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y >=
              nativeEvent.contentSize.height - paddingToBottom;
            setShowDownButton(!isAtBottom); 
          }}
          scrollEventThrottle={16} 

          keyboardShouldPersistTaps="handled"
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MessageItem item={item} isCurrentUser={item.user_id === session!.user.id} />
          )}
          contentContainerStyle={{ flexGrow: 1,}}
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
          <SendButton title="➤" onPress={sendMessage}/>
        </View>

        {showDownButton && 
          <TouchableOpacity style={styles.floatingButton}
            onPress={() => flatListRef.current?.scrollToEnd({ animated: true })}>
            <Icon name="chevron-down" size={20} color="#900" />
          </TouchableOpacity>
        }
      </View></Wrapper>
    </KeyboardAvoidingView>
    
  );
};

export default BuddyConnect;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightskyblue',
  },
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
  floatingButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: Platform.OS === "ios" ? 120: 60,
    right: 7,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
  },
  profilePhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  }
});