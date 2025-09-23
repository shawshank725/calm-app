import { QUICK_ACCESS_BUTTON_ICON_BACKGROUND_COLOR } from "@/constants/Misc";
import { CommonStyles } from "@/constants/themes/types";

const QuickAccessButtonLightStyles : CommonStyles = {
    container: {
        display: 'flex',
        alignItems:'center',
        justifyContent:'center',
        width: 75,
        padding: 10,
        rowGap: 5,
    },
    iconWrapper: {
        backgroundColor:QUICK_ACCESS_BUTTON_ICON_BACKGROUND_COLOR,
        padding:10,
        borderRadius: 30,
    },
    label: {
        fontWeight: 'bold',
        textAlign:'center',
        fontSize:12,
        height:30,
    }
}

export default QuickAccessButtonLightStyles;