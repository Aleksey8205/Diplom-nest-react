import { SupportRequest } from 'src/entities/supportRequest.entity';
import { Message } from 'src/entities/message.entity';
import { CreateSupportRequestDto, SendMessageDto, MarkMessagesAsReadDto } from '../dto/support.dto';


export interface GetChatListParams {
    user: number | null;
    isActive: boolean;
}

export interface ISupportRequestService {
    findSupportRequests(params: GetChatListParams): Promise<SupportRequest[]>;
    sendMessage(data: SendMessageDto): Promise<Message>;
    getMessages(supportRequest: number): Promise<Message[]>;
    subscribe(handler: (supportRequest: SupportRequest, message: Message) => void): () => void;
}

export interface ISupportRequestClientService {
    createSupportRequest(data: CreateSupportRequestDto): Promise<SupportRequest>;
    markMessagesAsRead(params: MarkMessagesAsReadDto);
    getUnreadCount(supportRequest: number): Promise<Message[]>;
}

export interface ISupportRequestEmployeeService {
    markMessagesAsRead(params: MarkMessagesAsReadDto);
    getUnreadCount(supportRequest: number): Promise<Message[]>;
    closeRequest(supportRequest: number): Promise<void>;
}