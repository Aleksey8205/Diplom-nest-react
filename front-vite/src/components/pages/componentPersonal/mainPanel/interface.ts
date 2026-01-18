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
