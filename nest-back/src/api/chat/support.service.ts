import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SupportRequest } from 'src/entities/supportRequest.entity';
import { Message } from 'src/entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, IsNull } from 'typeorm';

@Injectable()
export class SupportRequestService {
    constructor(
      @InjectRepository(SupportRequest)
      private readonly requestsRepo: Repository<SupportRequest>,
      @InjectRepository(Message)
      private readonly messagesRepo: Repository<Message>,
    ) {}

    async createSupportRequest(userId: number, text: string): Promise<SupportRequest> {
      const request = this.requestsRepo.create({
        user: userId,
        createdAt: new Date(),
        isActive: true,
        messages: [],
      });
      await this.requestsRepo.save(request);
      return request;
    }

    async addMessage(requestId: number, authorId: number, text: string): Promise<Message> {
      const supportRequest = await this.requestsRepo.findOneBy({ id: requestId }); // Сначала получаем объект
    
      if (!supportRequest) {
        throw new Error("Запрос не найден");
      }
    
      const message = new Message();
      message.author = authorId;
      message.sentAt = new Date();
      message.text = text;
      message.supportRequest = supportRequest; 
    
      await this.messagesRepo.save(message);
      return message;
    }


    async markMessagesAsRead(requestId: number, beforeDate: Date): Promise<void> {
      const supportRequest = await this.requestsRepo.findOneBy({ id: requestId });
  
      if (!supportRequest) {
        throw new Error("Запрос не найден"); 
      }

      await this.messagesRepo.update(
        {
          supportRequest, // Используем полученный объект
          readAt: IsNull(),
          sentAt: LessThanOrEqual(beforeDate),
        },
        { readAt: new Date() },
      );
  }

    async closeRequest(requestId: number): Promise<void> {
      await this.requestsRepo.update(requestId, { isActive: false });
    }

    async getUserChats(userId: number): Promise<SupportRequest[]> {
      return this.requestsRepo.find({ where: { user: userId } });
    }

    async getAllChats(): Promise<SupportRequest[]> {
      return this.requestsRepo.find();
    }

    async getChatHistory(requestId: number): Promise<Message[]> {
      return this.messagesRepo.find({ where: { supportRequest: { id: requestId } } });
    }
}