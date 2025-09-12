import { useInsertMessage, useMessageList } from '@/api/messenger/BuddyConnectMessaging';
import { useProfilePhoto } from '@/api/profile/Profile';
import { CustomActivityIndicator1 } from '@/components/CustomActivityIndicator';
import SendButton from '@/components/SendButton';
import { useAppTheme } from '@/constants/themes/ThemeManager';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';
import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react';
import {
  Image, View, Text,
  FlatList, KeyboardAvoidingView, 
  Platform, TouchableOpacity, SafeAreaView
} from 'react-native';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const Wrapper = Platform.OS === 'ios' ? SafeAreaView : View;


const MessageItem = ({ item, isCurrentUser }: { item: any; isCurrentUser: boolean }) => {
  const { data: photoUrl } = useProfilePhoto(item.user_id);

  return (
    <View
      style={{
        padding: 10,
        margin: 5,
        backgroundColor: isCurrentUser ? '#a9f584ff' : 'white',
        maxWidth: '80%',
        borderRadius: 15,
        flexDirection: 'row',
        alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
      }}
    >
      {photoUrl && (
        <Image source={{ uri: photoUrl }} style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          marginRight: 10,
        }} />
      )}
      <View style={{ flexShrink: 1 }}>
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

  const { styles } = useAppTheme();
  const screenStyles = styles.BuddyConnectScreen;

  const { data, error, isLoading, refetch } = useMessageList();
  const [message, setMessage] = useState('');
  const { mutate: insertMessage } = useInsertMessage();
  const { session, loading } = useAuth();
  const [showDownButton, setShowDownButton] = useState(true);
  const flatListRef = useRef<FlatList>(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [data]);

  useEffect(() => {
    const channel = supabase
      .channel('buddy_messages_channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'buddy_messages' },
        (payload) => {
          refetch();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refetch]);


  if (isLoading) {
    return <CustomActivityIndicator1 />
  }

  if (error) {
    return <Text>Failed to load messages</Text>
  }

  const sendMessage = () => {
    if (message.trim() === '') return;

    const tempMessage = {
      id: Date.now(), // temporary unique ID
      message,
      user_id: session!.user.id,
      created_at: new Date().toISOString(),
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
      <Wrapper style={{ flex: 1, }}>
        <View style={screenStyles.container}>

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
            contentContainerStyle={{ flexGrow: 1, }}
          />

          <View style={screenStyles.inputContainer}>
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="Type a message"
              mode="outlined"
              style={screenStyles.input}
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

          {showDownButton &&
            <TouchableOpacity style={screenStyles.floatingButton}
              onPress={() => flatListRef.current?.scrollToEnd({ animated: true })}>
              <Icon name="chevron-down" size={20} color="#900" />
            </TouchableOpacity>
          }
        </View></Wrapper>
    </KeyboardAvoidingView>

  );
};

export default BuddyConnect;
