import { CommonStyles } from "@/constants/themes/types";

const BookDetailsContentLightStyles : CommonStyles = {

  imageBackgroundStyles: {
    flex: 1, padding: 10, 
  },
  bookThumbnailPhoto: {
    width:"100%",
    aspectRatio: 1, 
    resizeMode: 'contain', 
    alignSelf: 'center',
  },
  bookInformationContainer: {
    backgroundColor: 'white', 
    padding: 15, 
    borderRadius: 10, 
    marginVertical: 10
  },
  writtenByText: {fontWeight:'bold'},
  authorNameLink : {color: 'blue'},
  pageCountText: {fontWeight:'bold'},
  descriptionText: {fontSize:20, fontWeight: 'bold'},
  description: {textAlign: 'justify'},
  extraOptionsContainer: {
    backgroundColor: 'white', 
    alignItems: 'center', 
    flexDirection: 'row', 
    justifyContent: 'center', 
    columnGap: 10,
    alignSelf:'center', 
    paddingHorizontal: 20,
    paddingVertical: 10, 
    borderRadius: 10,
  },
}

export default BookDetailsContentLightStyles;