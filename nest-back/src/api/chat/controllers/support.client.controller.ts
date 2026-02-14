import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Query,
  Get,
} from '@nestjs/common';
import { SupportRequestService } from '../support.service';
import { CreateSupportRequestDto, GetChatListParams } from '../dto/support.dto';
import { JwtGuard } from '../../../guards/jwt.guards';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/guards/roles.decorator';

@UseGuards(JwtGuard, RolesGuard)
@Roles('client')
@Controller('api/client/support-requests')
export class SupportRequestControllerClient {
  constructor(private readonly service: SupportRequestService) {}

  @Get()
  async findAll(@Request() req, @Query() query: GetChatListParams) {
    return this.service.findSupportRequests(query);
  }

  @Post()
  async create(@Request() req, @Body() body: CreateSupportRequestDto) {
    return this.service.create(body);
  }
}
