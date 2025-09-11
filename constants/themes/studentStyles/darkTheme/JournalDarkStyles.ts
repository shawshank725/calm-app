import { Platform } from "react-native";
import { CommonStyles } from "../../types";
import { BACKGROUND_COLOR_DARK } from "@/constants/Misc";

const JournalDarkStyles : CommonStyles = {
    container: {
        flex: 1,
        backgroundColor:BACKGROUND_COLOR_DARK
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
        paddingHorizontal: 6,
        paddingVertical: 6,
        marginBottom: Platform.OS === "ios" ? 56 : 0,
      },
      input: {
        flex: 1,
        marginRight: 5,
        backgroundColor: '#646464ff',
        height: 40,
      },
}
export default JournalDarkStyles;