// Service implementation using TypeORM for database operations

import { Injectable } from '@nestjs/common';
import { IsNull, Repository, LessThan, Not } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SupportRequest } from 'src/entities/supportRequest.entity';
import { Message } from 'src/entities/message.entity';
import {
  CreateSupportRequestDto,
  GetChatListParams,
  SendMessageDto,
} from './dto/support.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AuthService } from '../authentificate/auth.service';

@Injectable()
export class SupportRequestService {
  constructor(
    @InjectRepository(SupportRequest)
    private readonly supportRequestRepo: Repository<SupportRequest>,
    @InjectRepository(Message)
    private readonly messageRepo: Repository<Message>,
    private readonly eventEmitter: EventEmitter2,
    private readonly authService: AuthService,
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
    this.eventEmitter.emit('message:sent', savedMessage); // Emit events for further processing
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

  async getUnreadCountFromSupport(id: number): Promise<number> {
    return this.messageRepo.count({
      where: {
        supportRequest: { id },
        readAt: IsNull(),
        author: Not(id),
      },
    });
  }

  async markMessagesAsReadFromSupport(id: number, createdBefore: Date) {
    await this.messageRepo.update(
      {
        supportRequest: { id },
        readAt: IsNull(),
        sentAt: LessThan(createdBefore),
        author: Not(id),
      },
      { readAt: new Date() },
    );
  }

  async getUnreadCountFromUser(id: number): Promise<number> {
    return this.messageRepo.count({
      where: {
        supportRequest: { id },
        readAt: IsNull(),
        author: id,
      },
    });
  }

  async markMessagesAsReadFromUser(id: number, createdBefore: Date) {
    await this.messageRepo.update(
      {
        supportRequest: { id },
        readAt: IsNull(),
        sentAt: LessThan(createdBefore),
        author: id,
      },
      { readAt: new Date() },
    );
  }

  async closeRequest(id: number) {
    await this.supportRequestRepo.update({ id }, { isActive: false });
  }

  async authenticate(token: string): Promise<boolean> {
    try {
      const decoded = this.authService.checkUser(token);
      return true;
    } catch (error) {
      return false;
    }
  }
}