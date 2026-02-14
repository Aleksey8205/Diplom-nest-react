import { Controller, Post, Get, Patch, Delete, Param, Body, UseGuards, Request, Query } from '@nestjs/common';
import { SupportRequestService } from '../support.service';
import { SendMessageDto, GetChatListParams, MarkMessagesAsReadDto } from '../dto/support.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { JwtGuard } from '../../../guards/jwt.guards';

@UseGuards(JwtGuard)
@Controller('api/comon/support-requests')
export class SupportRequestControllerComon {
    constructor(private readonly service: SupportRequestService) {}

      
    @Post(':id/messages')
    async sendMessage(@Param('id') id: number, @Body() body: SendMessageDto) {
      return this.service.sendMessage({ ...body, supportRequest: id });
    }

        
    @Get(':id/messages')
    async getMessages(@Param('id') id: number) {
      const messages = await this.service.getMessages(id);
      if (!messages.length) {
        throw new HttpException('Нет сообщений для указанного обращения.', HttpStatus.NOT_FOUND);
      }
      return messages;
    }
        
    @Patch(':id/messages/read')
    async markMessagesAsRead(@Param('id') id: number, @Body() body: MarkMessagesAsReadDto) {
      await this.service.markMessagesAsRead({ ...body, supportRequest: id });
      return { success: true };
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
      await this.service.closeRequest(id);
      return { success: true };
    }

    @Get('unread-count')
    async globalUnreadCount(@Request() req) {
      return this.service.getUnreadCount();
    }
}