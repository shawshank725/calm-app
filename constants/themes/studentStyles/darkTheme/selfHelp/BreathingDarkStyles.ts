import { BACKGROUND_COLOR_DARK } from "@/constants/Misc";
import { CommonStyles } from "@/constants/themes/types";

const BOX_SIZE = 150;
const DOT_SIZE = 25;

const BreathingDarkStyles : CommonStyles = {
  container: {
    flex: 1,
    padding: 10,
    backgroundColor:BACKGROUND_COLOR_DARK
  },
  square: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    backgroundColor: 'yellow',
    borderWidth: 3,
    borderRadius: 10,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    position: 'absolute',
    backgroundColor: '#50C878',
    borderRadius: DOT_SIZE,
    borderWidth: 3,
  },
  boxBreathingContainer: { 
    justifyContent: 'center',
    alignItems: 'center',
   },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
  },
  instructionText: {
    marginVertical: 15,
    fontWeight: 'bold',
    fontSize: 15,
    color:'white'
  },
  holdText: {
    fontWeight: 'bold',
    fontSize: 15,
    width: 80,
    textAlign: 'center',
    marginHorizontal: 10,
    color:'white'
  }
};

export default BreathingDarkStyles;