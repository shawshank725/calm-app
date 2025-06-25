export type LibraryBook = {
  id: number;
  thumbnail_url: string;
  book_name: string;
  book_author: string;
  pdf_url: string;
  description: string,
  page_count : number,
};

export type LibraryBookProp = {
  libraryBook: LibraryBook;
};

export type SearchBarProps = {
  text: string;
  setText: (text: string) => void;
  onSearch?: () => void;
};





