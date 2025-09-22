import { useAppTheme } from '@/constants/themes/ThemeManager';
import {TouchableOpacity, View, Text} from 'react-native';

export type QuickAccessButtonProps = {
  icon: React.ReactNode;
  text: string;
  onPress?: () => void;
};

export default function QuickAccessButton({ icon, text, onPress }: QuickAccessButtonProps) {
  const {styles} = useAppTheme();
  const screenStyles = styles.QuickAccessButton;

  return (
    <TouchableOpacity style={screenStyles.container} onPress={onPress}>
      <View style={screenStyles.iconWrapper}>
        {icon}
      </View>
      <Text style={screenStyles.label}>{text}</Text>
    </TouchableOpacity>
  );
}