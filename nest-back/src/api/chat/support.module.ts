import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupportRequest } from 'src/entities/supportRequest.entity';
import { Message } from 'src/entities/message.entity';
import { SupportRequestService } from './support.service';

import { SupportRequestGateway } from './support.gateway';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AuthModule } from '../authentificate/auth.module';
import { SupportRequestControllerAdmin } from './controllers/support.admin.controller';
import { SupportRequestControllerClient } from './controllers/support.client.controller';
import { SupportRequestControllerComon } from './controllers/support.comon.controller';
import { SupportRequestControllerManager } from './controllers/support.manager.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SupportRequest, Message]), AuthModule],
  controllers: [
    SupportRequestControllerAdmin,
    SupportRequestControllerClient,
    SupportRequestControllerComon,
    SupportRequestControllerManager,
  ],
  providers: [SupportRequestService, SupportRequestGateway, EventEmitter2],
  exports: [],
})
export class SupportRequestModule {}
