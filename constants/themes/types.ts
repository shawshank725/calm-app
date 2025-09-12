import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { MaterialTopTabNavigationOptions } from "@react-navigation/material-top-tabs";
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
  floatingButton?: ViewStyle;

  // profile styles : 
  usernameContainer?: ViewStyle;
  buttonContainer?: ViewStyle;
  centered? : ViewStyle;
  normal?: ViewStyle;
  loadingText?: TextStyle;
  changePasswordContainer?: ViewStyle;

  // all components here ------------------------
  // book cards
  pressableCard?: ViewStyle;
  bookImage?: ImageStyle;
  bookNameStyles?: TextStyle;
  bookAuthorStyles?: TextStyle;

  // book details content
  imageBackgroundStyles?: ViewStyle;
  bookThumbnailPhoto?: ImageStyle;
  bookInformationContainer?: ViewStyle;
  writtenByText?: TextStyle;
  authorNameLink?: TextStyle;
  pageCountText?: TextStyle;
  descriptionText?: TextStyle;
  description?: TextStyle;
  extraOptionsContainer?: ViewStyle;

  // content not found text
  headerView?: ViewStyle;
  failedToFindBooksText?: TextStyle;

  // library search bar
  librarySearchBarContainer?: ViewStyle;
  searchBarAndCrossContainer?: ViewStyle;
  searchInputStyles?: TextStyle;

  // sgt library link
  linkText?: TextStyle;

  // grouding code here
  row?: ViewStyle;
  optionButton?: ViewStyle;
  headerBar?: ViewStyle;
  center?: TextStyle;
  left?: TextStyle;
  buddyConnect?: ViewStyle;
  step?:TextStyle;
  bold?:TextStyle;
  note?:TextStyle;

  // breathing code here
  square?: ViewStyle;
  dot?: ViewStyle;
  boxBreathingContainer?: ViewStyle;
  instructionText?: TextStyle;
  holdText?: TextStyle;
  
  // mental focus code here
  instructions?:TextStyle;
  gameContainer?:ViewStyle;
  answerContainer?:ViewStyle;

  username?: TextStyle;
  email?:TextStyle;

  // support shelf things here
  cardContainer?: ViewStyle;
  cardImageContainer?: ViewStyle;
  cardHeading?: TextStyle;
  cardDescription?: TextStyle;
  cardInformationContainer?: ViewStyle;
  cardImage?: ImageStyle;

  journalEntry?: ViewStyle;
  journalEntryContent?: TextStyle;

  BottomTab?: Partial<Pick<
    BottomTabNavigationOptions,
    "tabBarStyle" | "tabBarActiveTintColor" | "tabBarInactiveTintColor" | "tabBarBackground"
  >>;
  
  TopTab?: Partial<Pick<
    MaterialTopTabNavigationOptions,
    | "tabBarStyle"
    | "tabBarActiveTintColor"
    | "tabBarInactiveTintColor"
    | "tabBarIndicatorStyle"
    | "tabBarItemStyle"
    | "tabBarLabelStyle"
  >>;
  

  // expert things here
  textInput?: TextStyle;
  rowContainer?: ViewStyle;

  title?: TextStyle;
  //[customKey: string]: ViewStyle | TextStyle | ImageStyle | undefined;
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