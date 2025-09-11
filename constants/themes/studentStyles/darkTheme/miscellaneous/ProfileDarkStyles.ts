import { BACKGROUND_COLOR_DARK } from "@/constants/Misc";
import { CommonStyles } from "@/constants/themes/types";

const ProfileDarkStyles: CommonStyles = {

    warningText: {
        fontWeight: 'normal',
        fontSize: 17,
        color: "#fc5454ff"
    },
    input: {
        marginBottom: 10,
        backgroundColor: "#818181ff",
        textDecorationColor: 'none',
    },
    usernameContainer: {
        backgroundColor: "#3A3A3C",
        padding: 10,
        marginVertical: 10,
        borderRadius: 10,
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10,
        color:'white'
    },

    profilePhoto: {
        width: 100,
        height: 100,
        margin: 10,
        borderRadius: 50,
    },
    profilePhotoContainer: {
        backgroundColor: "#3A3A3C",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginVertical: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flexGrow: 1,
        gap: 10,
    },

    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"#3A3A3C",
    },
    normal: {
        flex: 1,
        padding: 20,
        backgroundColor: BACKGROUND_COLOR_DARK,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#555',
    },
    changePasswordContainer: { 
        backgroundColor: "#3A3A3C", 
        flexDirection: 'row', 
        borderRadius: 10, 
        padding: 10, 
    }
}

export default ProfileDarkStyles;