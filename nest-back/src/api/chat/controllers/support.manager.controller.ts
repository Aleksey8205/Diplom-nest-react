import { Controller, Get, UseGuards, Request, Query } from '@nestjs/common';
import { SupportRequestService } from '../support.service';
import {  GetChatListParams,  } from '../dto/support.dto';
import { JwtGuard } from '../../../guards/jwt.guards';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/guards/roles.decorator';

@UseGuards(JwtGuard, RolesGuard)
@Roles('manager')
@Controller('api/manager/support-requests')
export class SupportRequestControllerManager {
    constructor(private readonly service: SupportRequestService) {}

    @Get()
    async findAll(@Request() req, @Query() query: GetChatListParams) {
      return this.service.findSupportRequests(query);
    }
}