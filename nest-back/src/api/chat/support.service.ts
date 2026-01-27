import { Injectable } from '@nestjs/common';
import { IsNull, Repository, LessThan } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SupportRequest } from 'src/entities/supportRequest.entity';
import { Message } from 'src/entities/message.entity';
import {
  CreateSupportRequestDto,
  GetChatListParams,
  SendMessageDto,
} from './dto/support.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class SupportRequestService {
  constructor(
    @InjectRepository(SupportRequest)
    private readonly supportRequestRepo: Repository<SupportRequest>,
    @InjectRepository(Message)
    private readonly messageRepo: Repository<Message>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(dto: CreateSupportRequestDto) {
    const request = this.supportRequestRepo.create(dto);
    return this.supportRequestRepo.save(request);
  }

  async findAll(params: GetChatListParams) {
    return this.supportRequestRepo.find({ where: { ...params } });
  }

  async getMessages(id: number) {
    return this.messageRepo.find({
      where: { supportRequest: { id } },
      order: { sentAt: 'ASC' },
    });
  }

  async sendMessage(dto: SendMessageDto): Promise<Message> {
    const message = this.messageRepo.create({
      text: dto.text,
      author: dto.author,
      supportRequest: { id: dto.supportRequest }, 
    });
    const savedMessage = await this.messageRepo.save(message);
    this.eventEmitter.emit('message:sent', savedMessage);
    return savedMessage;
  }

  async markMessagesAsRead(id: number, createdBefore: Date) {
    await this.messageRepo.update(
      {
        supportRequest: { id },
        readAt: IsNull(),
        sentAt: LessThan(createdBefore),
      },
      { readAt: new Date() },
    );
  }
}
