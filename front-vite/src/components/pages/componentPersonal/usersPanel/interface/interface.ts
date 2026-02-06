export interface UserMap {
  id: number;
  name: string;
  contactPhone: string;
  email: string;
  rental: RentalMap;
  role: string;
  createdAt: Date;
}

export interface RentalMap {
  bookId: number;
  createdAt: Date;
  dateEnd: Date;
  dateStart: Date;
  id: number;
  libraryId: number;
  status: string;
  updatedAt: Date;
  userId: number;
}

export interface LibraryMap {
  id: number;
  address: string;
  name: string;
  description: string;
}

