import { WebSocketGateway, SubscribeMessage, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SupportRequestService } from './support.service';
import { SendMessageDto, MarkMessagesAsReadDto } from './dto/support.dto';

@WebSocketGateway()
export class SupportRequestGateway {
  constructor(private readonly service: SupportRequestService) {}

  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    server.on('connection', (client: Socket) => {
      console.log(`Client connected: ${client.id}`);

      const room = `chat-${client.handshake.query.chatId}`;
      client.join(room);
      console.log(`Client joined room: ${room}`);

      client.on('disconnect', () => {
        console.log(`Client disconnected: ${client.id}`);
      });
    });
  }

  @SubscribeMessage('subscribeToChat')
  handleSubscribeToChat(client: Socket, data: { chatId: number }) {
    const room = `chat-${data.chatId}`;
    client.join(room);
    console.log(`Client subscribed to room: ${room}`);
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(client: Socket, data: SendMessageDto) {
    console.log(data)
    try {
      const message = await this.service.sendMessage(data);
      const room = `chat-${data.supportRequest}`;
      this.server.to(room).emit('newMessage', message); 
    } catch (err) {
      client.emit('error', err.message);
    }
  }

  @SubscribeMessage('markMessagesAsRead')
  async handleMarkMessagesAsRead(client: Socket, data: MarkMessagesAsReadDto) {
    try {
      console.log(data)
      await this.service.markMessagesAsRead(data);
      const room = `chat-${data.supportRequest}`;
      this.server.to(room).emit('messagesMarkedAsRead'); 
    } catch (err) {
      client.emit('error', err.message);
    }
  }
}