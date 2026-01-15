export interface IStartBooking{
  onStartBooking: (book: Book) => void;
}

export interface IBooking {
  bookItem: Book | undefined;
}

export interface IStartSearch {
  onStartSearch: () => void;
}

export interface Library {
  id: number;
  name: string;
  address: string;
  description: string;
}


export interface Book {
  id: number;
  title: string;
  libraryId: number;
  author: string;
  year: number;
  description: string;
  coverImage: string;
  isAvailable: boolean;
  totalCopies: number;
  availableCopies: number;
  libraries: number[];
  library: Library; 
  librariesCount: number;
}

