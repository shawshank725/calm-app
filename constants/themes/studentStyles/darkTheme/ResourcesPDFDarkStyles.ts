import { BACKGROUND_COLOR_DARK,   HEADER_TEXT_COLOR_LIGHT } from "@/constants/Misc";
import { CommonStyles } from "../../types";

const ResourcesPDFDarkStyles: CommonStyles = {
    container: {
        backgroundColor: BACKGROUND_COLOR_DARK,
        display: 'flex',
        flex: 1,
        padding: 10
    },
    rowContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        borderRadius: 10,
        justifyContent: 'space-between',
    },
    title: {
        color: HEADER_TEXT_COLOR_LIGHT,
        fontSize: 16,
        width: 100,
    },
    textInput: {
        backgroundColor: '#a1a1a1ff',
        borderRadius: 10,
        margin: 5, width: '60%'
    },
    heading: {
        color:HEADER_TEXT_COLOR_LIGHT,
        fontSize:20,
        fontWeight:'bold',
        textAlign:'center',
        marginBottom:20
    },
}

export default ResourcesPDFDarkStyles;