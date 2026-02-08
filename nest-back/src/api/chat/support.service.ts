import { Injectable } from '@nestjs/common';
import { Repository, IsNull, Not, In, LessThanOrEqual } from 'typeorm';
import { SupportRequest } from 'src/entities/supportRequest.entity';
import { Message } from 'src/entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  SendMessageDto,
  GetChatListParams,
  MarkMessagesAsReadDto,
  CreateSupportRequestDto
} from './dto/support.dto';
import { ISupportRequestService } from './interfaces/interface';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class SupportRequestService implements ISupportRequestService {
  constructor(
    @InjectRepository(SupportRequest)
    private readonly supportRequestRepository: Repository<SupportRequest>,
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async findSupportRequests(params: GetChatListParams): Promise<SupportRequest[]> {
    let conditions = {};

    if (params.isActive !== undefined) {
      conditions['isActive'] = params.isActive;
    }

    if (params.user) {
      conditions['user'] = params.user;
    }

    return this.supportRequestRepository.find({ where: conditions });
  }


  async create(data: CreateSupportRequestDto): Promise<SupportRequest> {
    const newRequest = this.supportRequestRepository.create({
      user: data.user,
      isActive: true, 
      createdAt: new Date(),
    });

    return this.supportRequestRepository.save(newRequest);
  }

  async sendMessage(data: SendMessageDto): Promise<Message> {
    const message = this.messageRepository.create({
      author: data.author,
      supportRequest: { id: data.supportRequest },
      text: data.text,
      sentAt: new Date(),
    });

    const savedMessage = await this.messageRepository.save(message);

    this.eventEmitter.emit('new_message', {
      supportRequest: data.supportRequest,
      message: savedMessage,
    });

    return savedMessage;
  }

  async getMessages(supportRequestId: number): Promise<Message[]> {
    return this.messageRepository.find({
      where: { supportRequest: { id: supportRequestId } },
    });
  }

  subscribe(handler: (supportRequest: SupportRequest, message: Message) => void): () => void {
    this.eventEmitter.on('new_message', handler);
    return () => this.eventEmitter.off('new_message', handler);
  }

  async markMessagesAsRead(dto: MarkMessagesAsReadDto): Promise<void> {
     await this.messageRepository.update(
      {
        supportRequest: { id: dto.supportRequest },
        sentAt: LessThanOrEqual(dto.createdBefore),
      },
      { readAt: new Date() },
    );
  }

  async getUnreadCountForEmployee(supportRequestId: number): Promise<number> {
    return this.messageRepository.count({
      where: {
        supportRequest: { id: supportRequestId },
        readAt: IsNull(),
        author: Not(In(['employee'])),
      },
    });
  }

  async getUnreadCountForClient(supportRequestId: number): Promise<number> {
    return this.messageRepository.count({
      where: {
        supportRequest: { id: supportRequestId },
        readAt: IsNull(),
        author: In(['employee']),
      },
    });
  }

  async closeRequest(supportRequestId: number): Promise<void> {
    await this.supportRequestRepository.update(
      { id: supportRequestId },
      { isActive: false },
    );
  }
}