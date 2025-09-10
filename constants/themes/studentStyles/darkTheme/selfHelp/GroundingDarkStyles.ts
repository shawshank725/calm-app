import { BACKGROUND_COLOR_LIGHT } from "@/constants/Misc";
import { CommonStyles } from "../../../types";


const SelfHelpDarkStyles : CommonStyles = {
    container: {
    padding: 20,
    backgroundColor: BACKGROUND_COLOR_LIGHT,
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    color: "#444",
  },
  step: {
    fontSize: 16,
    marginBottom: 12,
    color: "#333",
    lineHeight: 22,
  },
  bold: {
    fontWeight: "bold",
  },
  note: {
    marginTop: 20,
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
    textAlign: "center",
  },
}

export default SelfHelpDarkStyles;