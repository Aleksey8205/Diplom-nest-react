import { Controller, Post, Get, Param, Body, Query, Inject, Req, BadRequestException, UseGuards } from '@nestjs/common';
import { SupportRequestService } from './support.service';
import { CreateSupportRequestDto, GetChatListParams, SendMessageDto } from './dto/support.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { JwtGuard } from 'src/guards/jwt.guards';

@UseGuards(JwtGuard)
@Controller('api/support-requests')
export class SupportRequestController {
  constructor(
    private readonly supportRequestService: SupportRequestService,
    @Inject(EventEmitter2) private eventEmitter: EventEmitter2,
  ) {}

  @Post()
  async create(@Body() dto: CreateSupportRequestDto) {
    const result = await this.supportRequestService.create(dto);
    this.eventEmitter.emit('support-request:new', result);
    return result;
  }

  @Get()
  async findAll(@Query() params: GetChatListParams) {
    return this.supportRequestService.findAll(params);
  }

  @Get(':id/messages')
  async getMessages(@Param('id') id: string) {
    return this.supportRequestService.getMessages(+id);
  }

  @Post(':id/messages')
  async sendMessage(@Param('id') id: number, @Body() messageData:  SendMessageDto) {
    const dto = messageData;
    const result = await this.supportRequestService.sendMessage(dto);
    return result;
  }
  

  @Post(':id/messages/read')
  async markMessagesAsRead(@Param('id') id: string, @Body() data: any) {
    return this.supportRequestService.markMessagesAsRead(+id, data.createdBefore);
  }
}