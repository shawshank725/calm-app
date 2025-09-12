import { BACKGROUND_COLOR_LIGHT, HEADER_COLOR_LIGHT, HEADER_TEXT_COLOR_DARK } from "@/constants/Misc";
import { CommonStyles } from "../../types";

const ResourcesPDFLightStyles : CommonStyles = {
    container: {
        backgroundColor:BACKGROUND_COLOR_LIGHT,
        display: 'flex',
        flex:1, 
        padding:10
    },
    rowContainer: {
        display: 'flex',
        flexDirection:'row',
        width:'100%',
        alignItems:'center',
        borderRadius:10,
        justifyContent:'space-between'
    },
    title: {
        color:HEADER_TEXT_COLOR_DARK,
        fontSize:16,
    },
    textInput: {
        backgroundColor:'#ffffffff',
        borderRadius:10,
        margin:5,width:'60%'
    }
}

export default ResourcesPDFLightStyles;