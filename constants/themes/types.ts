import { ViewStyle, ImageStyle, TextStyle } from "react-native";

export type CommonStyles = {
  container?: ViewStyle;

  // settings containers
  profileContainer?: ViewStyle;
  label?: TextStyle;
  profilePhoto?: ImageStyle;
  profilePhotoContainer? : ViewStyle;
  fullName?: TextStyle;
  appInfoContainer?: ViewStyle;
  heading? : TextStyle;
  oneRowContainer?: ViewStyle;
  leftIconStyles?: TextStyle;
  textIconContainer?: ViewStyle;
  lastTextIconContainer?: ViewStyle;
  text?: TextStyle;
  singleItems?: ViewStyle;
  warningText?: TextStyle;
  switchContainer?: ViewStyle;

  // buddy connect styles
  inputContainer?: ViewStyle;
  input?: TextStyle;
  floatingButton?: ViewStyle

  row?: ViewStyle;
  optionButton?: ViewStyle;
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