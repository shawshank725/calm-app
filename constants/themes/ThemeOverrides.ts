import { ThemeName, UserRole } from "../themes/types";
import { CommonStyles } from "./types";
import BuddyConnectDarkStyles from "./studentStyles/darkTheme/BuddyConnectDarkStyles";
import BookCardDarkStyles from "./studentStyles/darkTheme/components/BookCardDarkStyles";
import BookDetailsContentDarkStyles from "./studentStyles/darkTheme/components/BookDetailsContentDarkStyles";
import ContentNotFoundDarkStyles from "./studentStyles/darkTheme/components/ContentNotFoundDarkStyles";
import LibrarySearchBarDarkStyles from "./studentStyles/darkTheme/components/LibrarySearchBarDarkStyles";
import HomeScreenDarkStyles from "./studentStyles/darkTheme/HomeScreenDarkStyles";
import LibraryDarkStyles from "./studentStyles/darkTheme/LibraryDarkStyles";
import SettingsScreenDarkStyles from "./studentStyles/darkTheme/SettingsScreenDarkStyles";
import BuddyConnectLightStyles from "./studentStyles/lightTheme/BuddyConnectLightStyles";
import BookCardLightStyles from "./studentStyles/lightTheme/components/BookCardLightStyles";
import BookDetailsContentLightStyles from "./studentStyles/lightTheme/components/BookDetailsContentLightStyles";
import ContentNotFoundLightStyles from "./studentStyles/lightTheme/components/ContentNotFoundLightStyles";
import LibrarySearchBarLightStyles from "./studentStyles/lightTheme/components/LibrarySearchBarLightStyles";
import HomeScreenLightStyles from "./studentStyles/lightTheme/HomeScreenLightStyles";
import LibraryLightStyles from "./studentStyles/lightTheme/LibraryLightStyles";
import SettingsScreenLightStyles from "./studentStyles/lightTheme/SettingsScreenLightStyles";
import SGTLibraryLinkLightStyles from "./studentStyles/lightTheme/components/SGTLibraryLinkLightStyles";
import SGTLibraryLinkDarkStyles from "./studentStyles/darkTheme/components/SGTLibraryLinkDarkStyles";
import BookAuthorScreenLightStyles from "./studentStyles/lightTheme/BookAuthorScreenLightStyles";
import { BottomTabLightStyles } from "./studentStyles/lightTheme/tabs/BottomTabLightStyles";
import { BottomTabDarkStyles } from "./studentStyles/darkTheme/tabs/BottomTabDarkStyles";
import { TopTabLightStyles } from "./studentStyles/lightTheme/tabs/TopTabLightStyles";
import { TopTabDarkStyles } from "./studentStyles/darkTheme/tabs/TopTabDarkStyles";
import ProfileLightStyles from "./studentStyles/lightTheme/miscellaneous/ProfileLightStyles";
import ProfileDarkStyles from "./studentStyles/darkTheme/miscellaneous/ProfileDarkStyles";
import PasswordLightStyles from "./studentStyles/lightTheme/miscellaneous/PasswordLightStyles";
import PasswordDarkStyles from "./studentStyles/darkTheme/miscellaneous/PasswordDarkStyles";


export const ThemeOverrides: Record<UserRole, Record<ThemeName, Record<string, Partial<CommonStyles>>>> = {
    student: {
        light: {            
            HomeScreen: HomeScreenLightStyles,
            SettingsScreen: SettingsScreenLightStyles,
            BuddyConnectScreen: BuddyConnectLightStyles,
            Library: LibraryLightStyles,
            BookAuthorScreen: BookAuthorScreenLightStyles,

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