import { CommonStyles } from "@/constants/themes/types";

const LibrarySearchBarDarkStyles : CommonStyles = {
  librarySearchBarContainer: {
    flexDirection: 'row', 
    backgroundColor: '#1b1616ff',
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
    backgroundColor: '#6b6b6bff', 
    textDecorationColor: 'none', 
    borderRadius: 10,
    height: 40, 
    padding: 5,
    color: 'white'
  },
}

export default LibrarySearchBarDarkStyles;