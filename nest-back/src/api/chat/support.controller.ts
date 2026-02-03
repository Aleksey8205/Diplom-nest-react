import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  UseGuards,
  Request,
  Req,
} from '@nestjs/common';
import { SupportRequestService } from './support.service';
import { JwtGuard } from 'src/guards/jwt.guards';

// @UseGuards(JwtGuard)
@Controller('/api/support-requests')
export class SupportRequestController {
  constructor(private readonly service: SupportRequestService) {}

  // 🔥 Получение всех чатов
  @Get('/')
  async getAllChats(@Request() req) {
    return this.service.getAllChats();
  }

  // 🔥 Получение чатов пользователя
  @Get('/user/:userId')
  async getUserChats(@Param('userId') userId: number) {
    return this.service.getUserChats(userId);
  }

  // 🔥 Создание нового чата
  @Post('/')
  async createSupportRequest(@Request() req, @Body() body) {
    return this.service.createSupportRequest(req.user.id, body.text);
  }

  // 🔥 Добавление сообщения
  @Post('/:requestId/messages')
  async addMessage(@Param('requestId') requestId: number, @Body() body) {
    return this.service.addMessage(requestId, body.author, body.text);
  }

  // 🔥 Закрытие чата
  @Post('/:requestId/close')
  async closeRequest(@Param('requestId') requestId: number) {
    return this.service.closeRequest(requestId);
  }

  @Post('/mark-read/:requestId') async markMessagesAsRead(
    @Param('requestId') requestId: number,
    @Body() body,
  ) {
    return this.service.markMessagesAsRead(
      requestId,
      new Date(body.beforeDate),
    );
  }

  // 🔥 История сообщений
  @Get('/history/:requestId')
  async getChatHistory(@Param('requestId') requestId: number) {
    return this.service.getChatHistory(requestId);
  }
}
