import { BACKGROUND_COLOR_DARK, HEADER_COLOR_BLACK, HEADER_COLOR_LIGHT } from "@/constants/Misc";
import { CommonStyles } from "../../types";

const ExpertHomeScreenDarkStyles : CommonStyles = {
    container : {
        padding: 10,
        flex: 1,
        backgroundColor: BACKGROUND_COLOR_DARK
    },
    bookContainer : {
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    dashboardCard: {
        backgroundColor: "#443e3eff",
        padding:10,
        borderRadius:10,
        rowGap: 10,
        
    },
    heading: {
        fontSize: 20,
        fontWeight:'bold',
        color:HEADER_COLOR_LIGHT
    },
    content: {
        fontSize:16,
        maxWidth: 200,
        color: HEADER_COLOR_LIGHT
    },
    dashboardThumbnail: {
        width: 70,
        height: 70,
        borderRadius: 10,
    }
}

export default ExpertHomeScreenDarkStyles;