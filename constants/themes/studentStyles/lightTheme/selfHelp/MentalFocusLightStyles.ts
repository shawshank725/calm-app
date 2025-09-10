import { BACKGROUND_COLOR_LIGHT } from "@/constants/Misc";
import { CommonStyles } from "@/constants/themes/types";


const MentalFocusLightStyles : CommonStyles = {
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: BACKGROUND_COLOR_LIGHT
  },
  instructions: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 15,
  },
  gameContainer: {
    padding: 10, 
    backgroundColor: 'white',
    rowGap: 5,
    borderRadius: 10, 
  },
  answerContainer: {
    backgroundColor: 'white',
    borderRadius: 10, 
    alignItems: 'center',
    padding: 5,
  },
  input: {
    backgroundColor: '#E1EBEE',
    textDecorationColor: 'none',
  },
};

export default MentalFocusLightStyles;