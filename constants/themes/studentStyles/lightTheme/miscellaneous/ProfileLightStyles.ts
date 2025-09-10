import { BACKGROUND_COLOR_LIGHT } from "@/constants/Misc";
import { CommonStyles } from "@/constants/themes/types";

const ProfileLightStyles: CommonStyles = {

    warningText: {
        fontWeight: 'normal',
        fontSize: 17,
        color: 'red'
    },
    singleItems: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
    },
    input: {
        marginBottom: 10,
        backgroundColor: '#E1EBEE',
        textDecorationColor: 'none',
    },
    usernameContainer: {
        backgroundColor: 'white',
        padding: 10,
        marginVertical: 10,
        borderRadius: 10,
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10
    },

    profilePhoto: {
        width: 100,
        height: 100,
        margin: 10,
        borderRadius: 50,
    },
    profilePhotoContainer: {
        backgroundColor: 'white',
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
        backgroundColor: '#f9f9f9',
    },
    normal: {
        flex: 1,
        padding: 20,
        backgroundColor: BACKGROUND_COLOR_LIGHT,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#555',
    },
    changePasswordContainer: { backgroundColor: 'white', flexDirection: 'row', borderRadius: 10, padding: 10, }


}

export default ProfileLightStyles;