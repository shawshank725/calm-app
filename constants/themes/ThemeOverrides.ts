import { ThemeName, UserRole } from "../themes/types";
import BuddyConnectDarkStyles from "./studentStyles/darkTheme/BuddyConnectDarkStyles";
import BookCardDarkStyles from "./studentStyles/darkTheme/components/BookCardDarkStyles";
import BookDetailsContentDarkStyles from "./studentStyles/darkTheme/components/BookDetailsContentDarkStyles";
import ContentNotFoundDarkStyles from "./studentStyles/darkTheme/components/ContentNotFoundDarkStyles";
import LibrarySearchBarDarkStyles from "./studentStyles/darkTheme/components/LibrarySearchBarDarkStyles";
import SGTLibraryLinkDarkStyles from "./studentStyles/darkTheme/components/SGTLibraryLinkDarkStyles";
import HomeScreenDarkStyles from "./studentStyles/darkTheme/HomeScreenDarkStyles";
import LibraryDarkStyles from "./studentStyles/darkTheme/LibraryDarkStyles";
import PasswordDarkStyles from "./studentStyles/darkTheme/miscellaneous/PasswordDarkStyles";
import ProfileDarkStyles from "./studentStyles/darkTheme/miscellaneous/ProfileDarkStyles";
import BreathingDarkStyles from "./studentStyles/darkTheme/selfHelp/BreathingDarkStyles";
import GroundingDarkStyles from "./studentStyles/darkTheme/selfHelp/GroundingDarkStyles";
import MentalFocusDarkStyles from "./studentStyles/darkTheme/selfHelp/MentalFocusDarkStyles";
import SettingsScreenDarkStyles from "./studentStyles/darkTheme/SettingsScreenDarkStyles";
import { BottomTabDarkStyles } from "./studentStyles/darkTheme/tabs/BottomTabDarkStyles";
import { TopTabDarkStyles } from "./studentStyles/darkTheme/tabs/TopTabDarkStyles";
import BookAuthorScreenLightStyles from "./studentStyles/lightTheme/BookAuthorScreenLightStyles";
import BuddyConnectLightStyles from "./studentStyles/lightTheme/BuddyConnectLightStyles";
import BookCardLightStyles from "./studentStyles/lightTheme/components/BookCardLightStyles";
import BookDetailsContentLightStyles from "./studentStyles/lightTheme/components/BookDetailsContentLightStyles";
import ContentNotFoundLightStyles from "./studentStyles/lightTheme/components/ContentNotFoundLightStyles";
import LibrarySearchBarLightStyles from "./studentStyles/lightTheme/components/LibrarySearchBarLightStyles";
import SGTLibraryLinkLightStyles from "./studentStyles/lightTheme/components/SGTLibraryLinkLightStyles";
import HomeScreenLightStyles from "./studentStyles/lightTheme/HomeScreenLightStyles";
import LibraryLightStyles from "./studentStyles/lightTheme/LibraryLightStyles";
import PasswordLightStyles from "./studentStyles/lightTheme/miscellaneous/PasswordLightStyles";
import ProfileLightStyles from "./studentStyles/lightTheme/miscellaneous/ProfileLightStyles";
import BreathingLightStyles from "./studentStyles/lightTheme/selfHelp/BreathingLightStyles";
import GroundingLightStyles from "./studentStyles/lightTheme/selfHelp/GroundingLightStyles";
import MentalFocusLightStyles from "./studentStyles/lightTheme/selfHelp/MentalFocusLightStyles";
import SettingsScreenLightStyles from "./studentStyles/lightTheme/SettingsScreenLightStyles";
import { BottomTabLightStyles } from "./studentStyles/lightTheme/tabs/BottomTabLightStyles";
import { TopTabLightStyles } from "./studentStyles/lightTheme/tabs/TopTabLightStyles";
import { CommonStyles } from "./types";


export const ThemeOverrides: Record<UserRole, Record<ThemeName, Record<string, Partial<CommonStyles>>>> = {
    student: {
        light: {            
            HomeScreen: HomeScreenLightStyles,
            SettingsScreen: SettingsScreenLightStyles,
            BuddyConnectScreen: BuddyConnectLightStyles,
            Library: LibraryLightStyles,
            BookAuthorScreen: BookAuthorScreenLightStyles,

            GroundingScreen: GroundingLightStyles,
            BreathingScreen: BreathingLightStyles,
            MentalFocusScreen: MentalFocusLightStyles,

            ProfileScreen: ProfileLightStyles,
            PasswordScreen: PasswordLightStyles,

            BookCard: BookCardLightStyles,
            BookDetailsContent: BookDetailsContentLightStyles,
            ContentNotFound: ContentNotFoundLightStyles,
            LibrarySearchBar: LibrarySearchBarLightStyles,
            SGTLibraryLink: SGTLibraryLinkLightStyles,

            TopTab: TopTabLightStyles,
            BottomTab: BottomTabLightStyles,
        },
        dark : {
            HomeScreen: HomeScreenDarkStyles,
            SettingsScreen: SettingsScreenDarkStyles,
            BuddyConnectScreen: BuddyConnectDarkStyles,
            Library: LibraryDarkStyles,
            BookAuthorScreen: BookAuthorScreenLightStyles,

            GroundingScreen: GroundingDarkStyles,
            BreathingScreen: BreathingDarkStyles,
            MentalFocusScreen: MentalFocusDarkStyles,
            
            ProfileScreen: ProfileDarkStyles,
            PasswordScreen: PasswordDarkStyles,

            BookCard: BookCardDarkStyles,
            BookDetailsContent: BookDetailsContentDarkStyles,
            ContentNotFound: ContentNotFoundDarkStyles,
            LibrarySearchBar: LibrarySearchBarDarkStyles,
            SGTLibraryLink: SGTLibraryLinkDarkStyles,
            
            TopTab: TopTabDarkStyles,
            BottomTab: BottomTabDarkStyles,
        },
    },

    expert: {
        light: {},
        dark: {},
    },
    admin: {
        light: {},
        dark: {},
    },
}