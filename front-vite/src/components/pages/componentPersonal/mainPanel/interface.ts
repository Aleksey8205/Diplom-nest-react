export interface Rental {
  id: number;
  userId: number;
  libraryId: number;
  bookId: number;
  dateStart: Date;
  dateEnd: Date;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

 export interface Message {
  id: number;
  author: number;
  sentAt: Date; 
  text: string;
  readAt: Date | null;
}