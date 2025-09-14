import { BACKGROUND_COLOR_LIGHT } from "@/constants/Misc";
import { CommonStyles } from "../../types";

const ExpertSlotsLightStyle: CommonStyles = {
    container: {
        padding: 10,
        flex: 1,
        backgroundColor: BACKGROUND_COLOR_LIGHT,
    },
    slotContainer: {
        backgroundColor: '#ffffffff',
        borderRadius: 10,
        padding: 10,
    },
    text: {
        textAlign: 'center',
        fontSize: 18,
    },
    addNewSlotModalContainer: {
        backgroundColor: '#242424da',
        flex: 1,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    addNewSlotModal: {
        backgroundColor:'white',
        borderRadius: 10,
        padding: 10,
        width: '80%'
    },
    addSlotHeader: {
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    heading: {
        fontSize:20,
        fontWeight:'bold'
    },
    addText: {
        textAlign:'center',
        backgroundColor:'#38383896',
        fontSize: 16,
        fontWeight:'bold',
        padding: 5,
        width:150,
        borderRadius: 10,
    }
}

export default ExpertSlotsLightStyle;