import { ThemeName, UserRole } from "../themes/types";
import HomeScreenDarkStyles from "./studentStyles/darkTheme/HomeScreenDarkStyles";
import HomeScreenLightStyles from "./studentStyles/lightTheme/HomeScreenLightStyles";
import SettingsScreenLightStyles from "./studentStyles/lightTheme/SettingsScreenLightStyles";
import { CommonStyles } from "./types";


export const ThemeOverrides: Record<UserRole, Record<ThemeName, Record<string, CommonStyles>>> = {
    student: {
        light: {
            HomeScreen: HomeScreenLightStyles,
            SettingsScreen: SettingsScreenLightStyles,
        },
        dark : {
            HomeScreen: HomeScreenDarkStyles,
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