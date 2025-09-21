import { BACKGROUND_COLOR_LIGHT } from "@/constants/Misc";
import { CommonStyles } from "../../types";

const AllSessionsExpertLightStyles : CommonStyles = {
    container: {
        backgroundColor: BACKGROUND_COLOR_LIGHT,
        flex:1,
        padding: 10,
    },
    sessionCard: {
        backgroundColor: "white",
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        overflow:'hidden',
        height: 100,
    },
    sessionCardDataContainer: {
        padding:10,
    },
    sessionCardDataName: {
        fontWeight: 'bold',
    },
    buttonContainer: {
        backgroundColor:"#b3b3b3ff",
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
    },

    acceptText: {
        textAlign:'center',
        color:"#005307ff",
        fontWeight:'bold'
    },
    declineText: {
        textAlign:'center',
        color:"#ff0000ff",
        fontWeight:'bold'
    }

}

export default AllSessionsExpertLightStyles;