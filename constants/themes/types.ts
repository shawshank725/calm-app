import { ViewStyle, ImageStyle, TextStyle } from "react-native";

export type CommonStyles = {
  container?: ViewStyle;
  row?: ViewStyle;
  optionButton?: ViewStyle;
  image?: ImageStyle;
  label?: TextStyle;
  profilePhoto?: ImageStyle;
  headerBar?: ViewStyle;
  center?: TextStyle;
  left?: TextStyle;
  buddyConnect?: ViewStyle;
  [customKey: string]: ViewStyle | TextStyle | ImageStyle | undefined;
};

export type UserRole = 'admin' | 'student' | 'expert';
export type ThemeName = 'light' | 'dark';

export type ThemeContextType = {
  theme: ThemeName;
  role: UserRole;
  styles: Record<string, CommonStyles>;
  setTheme: (theme: ThemeName) => void;
  setRole: (role: UserRole) => void;
  toggleTheme: () => void; 
};