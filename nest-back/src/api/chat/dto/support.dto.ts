export interface CreateSupportRequestDto {
  user: number;
  text: string;
}

export interface SendMessageDto {
  author: number;
  supportRequest: number;
  text: string;
}

export interface MarkMessagesAsReadDto {
  user: number;
  supportRequest: number;
  createdBefore: Date;
}

export interface GetChatListParams {
  user: number;
  isActive: boolean;
}
