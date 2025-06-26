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


export const ThemeOverrides: Record<UserRole, Record<ThemeName, Record<string, CommonStyles>>> = {
    student: {
        light: {
            HomeScreen: HomeScreenLightStyles,
            SettingsScreen: SettingsScreenLightStyles,
            BuddyConnectScreen: BuddyConnectLightStyles,
            Library: LibraryLightStyles,
            BookAuthorScreen: BookAuthorScreenLightStyles,

            BookCard: BookCardLightStyles,
            BookDetailsContent: BookDetailsContentLightStyles,
            ContentNotFound: ContentNotFoundLightStyles,
            LibrarySearchBar: LibrarySearchBarLightStyles,
            SGTLibraryLink: SGTLibraryLinkLightStyles,

            BottomTab: BottomTabLightStyles,
        },
        dark : {
            HomeScreen: HomeScreenDarkStyles,
            SettingsScreen: SettingsScreenDarkStyles,
            BuddyConnectScreen: BuddyConnectDarkStyles,
            Library: LibraryDarkStyles,
            BookAuthorScreen: BookAuthorScreenLightStyles,

            BookCard: BookCardDarkStyles,
            BookDetailsContent: BookDetailsContentDarkStyles,
            ContentNotFound: ContentNotFoundDarkStyles,
            LibrarySearchBar: LibrarySearchBarDarkStyles,
            SGTLibraryLink: SGTLibraryLinkDarkStyles,
            
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