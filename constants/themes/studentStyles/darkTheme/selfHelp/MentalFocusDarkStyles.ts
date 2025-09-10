import { CommonStyles } from "@/constants/themes/types";


const MentalFocusDarkStyles : CommonStyles = {
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'lightgreen'
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

export default MentalFocusDarkStyles;