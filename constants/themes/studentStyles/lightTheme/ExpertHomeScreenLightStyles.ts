import { BACKGROUND_COLOR_LIGHT } from "@/constants/Misc";
import { CommonStyles } from "../../types";

const ExpertHomeScreenLightStyles : CommonStyles = {
    container : {
        padding: 10,
        flex: 1,
        backgroundColor: BACKGROUND_COLOR_LIGHT,
        display: 'flex',
        flexDirection:'column',
        rowGap: 10
    },
    bookContainer : {
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding: 10,
        backgroundColor: "#eeeeeeff", 
        borderRadius:10,
        marginHorizontal:10, 
        columnGap: 10,
    },
    dashboardCard: {
        backgroundColor: "#ffffffff",
        borderRadius:10,
        rowGap: 10,
        overflow:'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        // Android shadow
        elevation: 5,
    },
    viewMoreBooksButton:{
        borderTopWidth: 1,
        borderColor: '#b9b9b9ff',
        width:'100%',
        backgroundColor: '#f7f7f7ff'
    },
    viewMoreBooksButtonText:{
        textAlign:'center',
        fontSize: 16,
        padding: 5,
    },
    heading: {
        fontSize: 20,
        fontWeight:'bold',
        padding: 10,
    },
    content: {
        fontSize:16,
        maxWidth: 200,
    },
    bookNameStyles: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    bookAuthorStyles: {

    },
    dashboardThumbnail: {
        width: 70,
        height: 70,
        borderRadius: 10,
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
}

export default ExpertHomeScreenLightStyles;