import { Platform } from "react-native";
import { CommonStyles } from "../../types";
import { BACKGROUND_COLOR_LIGHT } from "@/constants/Misc";

const JournalLightStyles: CommonStyles = {
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR_LIGHT
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "transparent",
    paddingHorizontal: 6,
    paddingVertical: 6,
    marginBottom: Platform.OS === "ios" ? 56 : 0,
  },
  input: {
    flex: 1,
    marginRight: 5,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    height: 40,
  },
  journalEntry: {
    padding: 10,
    margin: 5,
    backgroundColor: "white",
    width: "90%",
    borderRadius: 15,
    flexDirection: "column", alignSelf: 'center'
  },

}
export default JournalLightStyles;