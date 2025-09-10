import { BACKGROUND_COLOR_DARK } from "@/constants/Misc";
import { CommonStyles } from "../../types";

const SettingsScreenDarkStyles: CommonStyles = {
  appInfoContainer: {
    backgroundColor: "white", 
    borderRadius: 10, 
    marginVertical: 5, 
    paddingHorizontal: 10,
  },
  text : {padding: 7,  fontSize: 16, },

  textIconContainer: {
    flexDirection:'row', 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    borderBottomWidth: 1, 
    borderColor: 'grey' 
  },
  lastTextIconContainer: {
    flexDirection:'row', 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'space-between', 
  },
  heading: {
    borderBottomWidth: 1,
    padding: 7,
    borderColor: 'grey', 
    fontSize: 17, 
    fontWeight:'bold'
  },
  warningText: {
    fontWeight: 'normal', 
    fontSize: 17,
    color: 'red'
  },
  singleItems: {
    backgroundColor: "white", 
    padding:10,
    borderRadius: 10, 
    marginTop: 10, 
  },
  leftIconStyles :{
    paddingRight: 5,
  },
  oneRowContainer: {
    alignItems: 'center', 
    flexDirection: 'row', 
    justifyContent: 'space-between',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    marginTop: 5,
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10
  },
  profilePhoto: {
    width: 60,
    height: 60,
    margin: 10,  
    borderRadius: 50,
  },
  fullName: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  profilePhotoContainer: {
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  profileContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
    borderRadius: 15, 
    marginVertical: 10,
    backgroundColor: 'white'
  },
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: BACKGROUND_COLOR_DARK,
  },
  input: {
    marginBottom: 25,
    backgroundColor: '#E1EBEE',
    textDecorationColor: 'none',
  },
};

export default SettingsScreenDarkStyles;