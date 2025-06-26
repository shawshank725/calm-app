import { CommonStyles } from "@/constants/themes/types";

const LibrarySearchBarLightStyles : CommonStyles = {
  librarySearchBarContainer: {
    flexDirection: 'row', 
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
    alignItems:'center',
    columnGap: 10,
    marginBottom: 10, 
    paddingHorizontal: 10,
  },
  searchBarAndCrossContainer: {
    flex: 2,
    flexDirection: 'row', 
    alignItems: 'center', 
    columnGap: 10
  },
  searchInputStyles: {
    backgroundColor: '#E1EBEE', 
    textDecorationColor: 'none', 
    borderRadius: 10,
    height: 40, 
    padding: 5,
  },
}

export default LibrarySearchBarLightStyles;