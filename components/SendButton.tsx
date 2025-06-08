import { View, Text, StyleSheet, TouchableOpacity, GestureResponderEvent } from "react-native";

type ButtonProps = {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
};

const SendButton = ({ title, onPress, disabled = false }: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, disabled && styles.disabled]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
    >
      <Text style={[styles.text, disabled && styles.disabledText]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#6495ED',
    padding: 0,
    borderRadius: 40,
    borderColor: 'black',
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    width: 40,
    aspectRatio: 1,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    color: '#ccc',
  },
});

export default SendButton;
