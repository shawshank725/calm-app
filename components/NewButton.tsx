import { View, Text, StyleSheet, TouchableOpacity, GestureResponderEvent } from "react-native";

type ButtonProps = {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
};

const NewButton = ({ title, onPress, disabled = false }: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles1.container, disabled && styles1.disabled]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
    >
      <Text style={[styles1.text, disabled && styles1.disabledText]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles1 = StyleSheet.create({
  container: {
    backgroundColor: '#6495ED',
    padding: 3,
    paddingHorizontal: 5,
    borderRadius: 40,
    borderColor: 'black',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'black',
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    color: '#ccc',
  },
});

export default NewButton;
