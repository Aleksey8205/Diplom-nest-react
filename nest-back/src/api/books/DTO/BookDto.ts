export interface CreateBookDTO {
  libraryId: number;
  title: string;
  author: string;
  year: number;
  description: string;
  coverImage: string;
  isAvailable: boolean;
}

export interface UpdateBookDTO {
  libraryId?: number;
  title?: string;
  author?: string;
  year?: number;
  description?: string;
  coverImage?: string;
  isAvailable?: boolean;
}
