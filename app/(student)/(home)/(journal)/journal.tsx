import { useInsertMessage, useJournalList } from "@/api/journal/Journal";
import { CustomActivityIndicator1 } from "@/components/CustomActivityIndicator";
import SendButton from "@/components/SendButton";
import { useAppTheme } from "@/constants/themes/ThemeManager";
import { useAuth } from "@/providers/AuthProvider";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, View, Text, FlatList } from "react-native";
import { TextInput } from "react-native-paper";

type Props = {
  item: {
    id: number | string;
    content: string;
    created_at?: string;
  };
  screenStyles: any;
};

const JournalEntry = ({ item ,screenStyles }: Props) => {
  return (
    <View
      style={screenStyles.journalEntry}
    >
      <Text style={screenStyles.journalEntryContent}>{item.content}</Text>
      {item.created_at && (
        <Text style={{ fontSize: 12, color: "gray", marginTop: 4 }}>
          {new Date(item.created_at).toLocaleString()}
        </Text>
      )}
    </View>
  );
}

const Wrapper = Platform.OS === 'ios' ? SafeAreaView : View;

export default function JournalScreen() {
  const { styles } = useAppTheme();
  const screenStyles = styles.JournalScreen;

  const { session, loading } = useAuth();
  const userId = session?.user.id;

  const { data, error, isLoading, refetch } = useJournalList(userId ?? "");

  const [message, setMessage] = useState('');
  const queryClient = useQueryClient();
  const [showDownButton, setShowDownButton] = useState(true);
  const flatListRef = useRef<FlatList>(null);
  const { mutate: insertJournalEntry } = useInsertMessage();

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [data]);

  const sendMessage = () => {
    if (message.trim() === '') return;

    const tempMessage = {
      id: Date.now(), // temporary unique ID
      content: message,
      user_id: session!.user.id,
      created_at: new Date().toISOString(),
    };
    queryClient.setQueryData(['journal', userId], (old: any) => [...(old || []),tempMessage, ]);
    insertJournalEntry({content: message, user_id: session?.user.id, created_at:tempMessage.created_at});
    setMessage('');
  }

  if (isLoading) {
    return <CustomActivityIndicator1 />
  }

  if (error) {
    return <Text>Failed to load journal entries</Text>
  }

  return (
    <KeyboardAvoidingView
      style={screenStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.select({ ios: 37, android: 140 })}
    >
      <Wrapper style={{ flex: 1, }}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={data}
            ref={flatListRef}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <JournalEntry item={item} screenStyles={screenStyles}/>}
            keyboardShouldPersistTaps="handled"
            scrollEventThrottle={16}
            onScroll={({ nativeEvent }) => {
              const paddingToBottom = 20;
              const isAtBottom =
                nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y >=
                nativeEvent.contentSize.height - paddingToBottom;
              setShowDownButton(!isAtBottom);
            }}
            contentContainerStyle={{ flexGrow: 1 }}
          />

        </View>

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
          <SendButton title="➤" onPress={sendMessage}/>
        </View>
      </Wrapper>
    </KeyboardAvoidingView>
  );
}