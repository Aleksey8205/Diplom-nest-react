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
    server.on('connection', (socket: Socket) => {
      console.log('Client connected');
    });
  }

  @SubscribeMessage('authenticate')
  async authenticate(@ConnectedSocket() socket: Socket, data: { token: string }) {
    const isAuthenticated = await this.service.authenticate(data.token);
    if (isAuthenticated) {
      socket.join('authenticated'); 
      console.log('Client authenticated');
    } else {
      socket.disconnect(); 
      console.log('Client failed to authenticate');
    }
  }

  @SubscribeMessage('subscribeToChat')
  handleSubscribeToChat(
    @ConnectedSocket() socket: Socket,
    data: { supportRequest: number }
  ) {
    if (!data || typeof data.supportRequest !== 'number') {
      console.error('Invalid subscription data received.', data);
      return;
    }
  
    const roomName = `chat-${data.supportRequest}`;
    socket.join(roomName);
    console.log(`Client subscribed to chat ${roomName}`);
  }

  @SubscribeMessage('sendMessage')
  async sendMessage(
    @ConnectedSocket() socket: Socket,
    data: { supportRequest: number; text: string; author: number }
  ) {
    const messageData: SendMessageDto = {
      supportRequest: data.supportRequest,
      text: data.text,
      author: data.author,
    };
    
    const message = await this.service.sendMessage(messageData);
    const roomName = `chat-${data.supportRequest}`;
    this.server.to(roomName).emit('newMessage', message); 
  }

  @SubscribeMessage('markMessagesAsRead')
  async markMessagesAsRead(@ConnectedSocket() socket: Socket, data: { id: number; createdBefore: string; author: number }) {
    const date = new Date(data.createdBefore);
    if (data.author === socket.handshake.auth.userId) {
      await this.service.markMessagesAsReadFromUser(data.id, date); 
    } else {
      await this.service.markMessagesAsReadFromSupport(data.id, date); 
    }
    this.server.emit('messagesMarkedAsRead', { id: data.id }); 
  }

  // Handling errors gracefully
  @SubscribeMessage('error')
  handleError(@ConnectedSocket() socket: Socket, error: any) {
    console.error('WebSocket error:', error);
    socket.emit('error', error); 
  }

  // Reconnecting upon disconnections
  @SubscribeMessage('reconnect')
  handleReconnect(@ConnectedSocket() socket: Socket) {
    console.log('Client reconnected');
    socket.emit('reconnected'); 
  }
}