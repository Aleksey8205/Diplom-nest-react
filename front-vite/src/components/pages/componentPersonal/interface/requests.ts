export interface Request {
  createdAt: Date;
  id: number;
  isActive: boolean;
  user: number;
}

export interface MarkMessagesAsReadDto {
  user: number | undefined;
  supportRequest: number;
  createdBefore: string;
}
