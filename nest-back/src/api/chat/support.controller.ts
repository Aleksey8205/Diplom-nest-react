import { Controller, Post, Get, Patch, Delete, Param, Body, UseGuards, Request, Query } from '@nestjs/common';
import { SupportRequestService } from './support.service';
import { SendMessageDto, GetChatListParams, MarkMessagesAsReadDto, CreateSupportRequestDto } from './dto/support.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { JwtGuard } from '../../guards/jwt.guards';

@UseGuards(JwtGuard)
@Controller('support-requests')
export class SupportRequestController {
    constructor(private readonly service: SupportRequestService) {}

    // GET /support-requests/?user=1&isActive=true
    @Get()
    async findAll(@Request() req, @Query() query: GetChatListParams) {
      return this.service.findSupportRequests(query);
    }

    // POST /support-requests/
    @Post()
    async create(@Request() req, @Body() body: CreateSupportRequestDto) {
      return this.service.create(body);
    }

    // POST /support-requests/{id}/messages
    @Post(':id/messages')
    async sendMessage(@Param('id') id: number, @Body() body: SendMessageDto) {
      return this.service.sendMessage({ ...body, supportRequest: id });
    }

    // GET /support-requests/{id}/messages
    @Get(':id/messages')
    async getMessages(@Param('id') id: number) {
      const messages = await this.service.getMessages(id);
      if (!messages.length) {
        throw new HttpException('Нет сообщений для указанного обращения.', HttpStatus.NOT_FOUND);
      }
      return messages;
    }

    // PATCH /support-requests/{id}/mark-read
    @Patch(':id/mark-read')
    async markMessagesAsRead(@Param('id') id: number, @Body() body: MarkMessagesAsReadDto) {
      await this.service.markMessagesAsRead({ ...body, supportRequest: id });
      return { success: true };
    }

    // DELETE /support-requests/{id}
    @Delete(':id')
    async delete(@Param('id') id: number) {
      await this.service.closeRequest(id);
      return { success: true };
    }

    // GET /support-requests/unread-count/{id}
    @Get('unread-count/:id')
    async unreadCount(@Param('id') id: number, @Request() req) {
      if (req.user.role === 'employee') {
        return this.service.getUnreadCountForEmployee(id);
      } else {
        return this.service.getUnreadCountForClient(id);
      }
    }
}