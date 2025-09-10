import { BACKGROUND_COLOR_DARK, BACKGROUND_COLOR_LIGHT } from "@/constants/Misc";
import { CommonStyles } from "../../../types";


const BreathingDarkStyles : CommonStyles = {
    container: {
    padding: 20,
    backgroundColor: BACKGROUND_COLOR_DARK,
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
    color:'white'
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    color: "#acacacff",
  },
  step: {
    fontSize: 16,
    marginBottom: 12,
    color: "#a8a8a8ff",
    lineHeight: 22,
  },
  bold: {
    fontWeight: "bold",
  },
  note: {
    marginTop: 20,
    fontSize: 14,
    color: "#9e9e9eff",
    fontStyle: "italic",
    textAlign: "center",
  },
}

export default BreathingDarkStyles;