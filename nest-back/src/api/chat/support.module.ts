import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupportRequest } from 'src/entities/supportRequest.entity';
import { Message } from 'src/entities/message.entity';
import { SupportRequestService } from './support.service';
import { SupportRequestController } from './support.controller';
import { ChatGateway } from './support.gateway';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Module({
  imports: [
    TypeOrmModule.forFeature([SupportRequest, Message]),
   
  ],
  controllers: [SupportRequestController],
  providers: [SupportRequestService, ChatGateway, EventEmitter2],
  exports: []
})
export class SupportRequestModule {}