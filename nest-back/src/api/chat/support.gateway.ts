import { WebSocketGateway, SubscribeMessage, WebSocketServer, OnGatewayInit, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { SupportRequestService } from './support.service';
import { SendMessageDto } from './dto/support.dto';

@WebSocketGateway()
export class ChatGateway implements OnGatewayInit {
  constructor(private readonly service: SupportRequestService) {}

  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    console.log('WebSocket initialized');
  }

  @SubscribeMessage('subscribeToChat')
  handleSubscribeToChat(@ConnectedSocket() socket: Socket, data: { supportRequestId: number }) {
    const roomName = `chat-${data.supportRequestId}`;
    socket.join(roomName);
    console.log(`Client subscribed to chat ${roomName}`);
  }

  @SubscribeMessage('sendMessage')
  async sendMessage(@ConnectedSocket() socket: Socket, data: { id: number; text: string; author: number }) {
    const messageData: SendMessageDto = {
      supportRequest: data.id,
      text: data.text,
      author: data.author
    };
  
    const message = await this.service.sendMessage(messageData);
    const roomName = `chat-${data.id}`;
    this.server.to(roomName).emit('newMessage', message);
  }
  @SubscribeMessage('markMessagesAsRead')
  async markMessagesAsRead(@ConnectedSocket() socket: Socket, data: { id: number; createdBefore: string }) {
    const date = new Date(data.createdBefore);
    await this.service.markMessagesAsRead(data.id, date);
    this.server.emit('messagesMarkedAsRead', { id: data.id });
  }
}