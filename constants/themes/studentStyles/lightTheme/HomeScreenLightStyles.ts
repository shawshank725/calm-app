import { BACKGROUND_COLOR_LIGHT } from "@/constants/Misc";
import { CommonStyles } from "../../types";

const HomeScreenLightStyles: CommonStyles = {
    container: {
        padding: 20,
        backgroundColor: BACKGROUND_COLOR_LIGHT,
        flex: 1,
    },
    quickAccessCard: {
        backgroundColor: "#ffffffff",
        padding:10,
        borderRadius:10,
        rowGap: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    quickAccessHeading: {
        fontWeight: 'bold',
        fontSize: 20
    },
    quickAccessButtonContainer: {
        display:'flex',
        flexDirection:"row",
        justifyContent:'center',
        columnGap:10,
    },
};

export default HomeScreenLightStyles;