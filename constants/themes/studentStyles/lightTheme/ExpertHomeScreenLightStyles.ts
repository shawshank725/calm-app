import { BACKGROUND_COLOR_LIGHT } from "@/constants/Misc";
import { CommonStyles } from "../../types";

const ExpertHomeScreenLightStyles : CommonStyles = {
    container : {
        padding: 10,
        flex: 1,
        backgroundColor: BACKGROUND_COLOR_LIGHT
    },
    bookContainer : {
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    dashboardCard: {
        backgroundColor: "#ffffffff",
        padding:10,
        borderRadius:10,
        rowGap: 10
    },
    heading: {
        fontSize: 20,
        fontWeight:'bold',
    },
    content: {
        fontSize:16,

    }
}

export default ExpertHomeScreenLightStyles;