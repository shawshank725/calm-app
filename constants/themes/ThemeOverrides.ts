import { ThemeName, UserRole } from "../themes/types";
import BuddyConnectDarkStyles from "./studentStyles/darkTheme/BuddyConnectDarkStyles";
import BookCardDarkStyles from "./studentStyles/darkTheme/components/BookCardDarkStyles";
import BookDetailsContentDarkStyles from "./studentStyles/darkTheme/components/BookDetailsContentDarkStyles";
import ContentNotFoundDarkStyles from "./studentStyles/darkTheme/components/ContentNotFoundDarkStyles";
import LibrarySearchBarDarkStyles from "./studentStyles/darkTheme/components/LibrarySearchBarDarkStyles";
import HomeScreenDarkStyles from "./studentStyles/darkTheme/HomeScreenDarkStyles";
import SettingsScreenDarkStyles from "./studentStyles/darkTheme/SettingsScreenDarkStyles";
import BuddyConnectLightStyles from "./studentStyles/lightTheme/BuddyConnectLightStyles";
import BookCardLightStyles from "./studentStyles/lightTheme/components/BookCardLightStyles";
import BookDetailsContentLightStyles from "./studentStyles/lightTheme/components/BookDetailsContentLightStyles";
import ContentNotFoundLightStyles from "./studentStyles/lightTheme/components/ContentNotFoundLightStyles";
import LibrarySearchBarLightStyles from "./studentStyles/lightTheme/components/LibrarySearchBarLightStyles";
import HomeScreenLightStyles from "./studentStyles/lightTheme/HomeScreenLightStyles";
import SettingsScreenLightStyles from "./studentStyles/lightTheme/SettingsScreenLightStyles";
import { CommonStyles } from "./types";


export const ThemeOverrides: Record<UserRole, Record<ThemeName, Record<string, CommonStyles>>> = {
    student: {
        light: {
            HomeScreen: HomeScreenLightStyles,
            SettingsScreen: SettingsScreenLightStyles,
            BuddyConnectScreen: BuddyConnectLightStyles,

            BookCard: BookCardLightStyles,
            BookDetailsContent: BookDetailsContentLightStyles,
            ContentNotFound: ContentNotFoundLightStyles,
            LibrarySearchBar: LibrarySearchBarLightStyles,
        },
        dark : {
            HomeScreen: HomeScreenDarkStyles,
            SettingsScreen: SettingsScreenDarkStyles,
            BuddyConnectScreen: BuddyConnectDarkStyles,

            BookCard: BookCardDarkStyles,
            BookDetailsContent: BookDetailsContentDarkStyles,
            ContentNotFound: ContentNotFoundDarkStyles,
            LibrarySearchBar: LibrarySearchBarDarkStyles,
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