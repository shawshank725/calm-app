import { CommonStyles } from "../../types";
import {  Platform } from 'react-native';

const BuddyConnectDarkStyles : CommonStyles = {
    
    container: {
        flex: 1,
        backgroundColor: 'blue',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgb(0, 255, 13)',
        paddingHorizontal: 6,
        paddingVertical: 6,
        marginBottom: Platform.OS === "ios" ? 56: 0,
    },
    input: {
        flex: 1,
        marginRight: 5,
        backgroundColor: 'rgb(255, 252, 86)',
        height: 40,
    },
    floatingButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: Platform.OS === "ios" ? 120: 60,
        right: 7,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 20,
    },
    profilePhoto: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    }
}

export default BuddyConnectDarkStyles;