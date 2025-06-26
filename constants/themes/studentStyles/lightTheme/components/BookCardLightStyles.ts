import { CommonStyles } from "@/constants/themes/types";

const BookCardLightStyles : CommonStyles = {

    pressableCard : { 
        backgroundColor: 'white', 
        maxWidth: '50%', 
        borderRadius: 10, 
        alignItems: 'center', 
        padding: 10, 
        flex: 1 
    },
    bookImage: { 
        width: '100%', 
        aspectRatio: 1, 
        borderRadius: 8 
    },
    bookNameStyles: {
        fontSize: 16, 
        fontWeight: 'bold'
    },
    bookAuthorStyles: {
        fontStyle: 'italic'
    }    
}

export default BookCardLightStyles;