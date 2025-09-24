import { BACKGROUND_COLOR_LIGHT, QUICK_ACCESS_BUTTON_ICON_BACKGROUND_COLOR, QUICK_ACCESS_BUTTON_ICON_COLOR } from "@/constants/Misc";
import { CommonStyles } from "../../types";

const ApplyLeaveLightStyles : CommonStyles = {
    container: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR_LIGHT,
        padding: 10,
    },
    datePickerContainer: {
        display:'flex',
        flexDirection: 'row',
        width: '40%',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    calendarIcon: {
        backgroundColor: QUICK_ACCESS_BUTTON_ICON_BACKGROUND_COLOR,
        padding : 10,
        borderRadius: 20,
    },
    cardContainer: {
        backgroundColor: "#fffefeff",
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        rowGap: 10,
    }
};

export default ApplyLeaveLightStyles;