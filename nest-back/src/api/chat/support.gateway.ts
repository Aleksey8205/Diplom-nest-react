import { WebSocketGateway, SubscribeMessage, OnGatewayInit, OnGatewayConnection, WsResponse, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SupportRequestService } from './support.service';

@WebSocketGateway()
export class SupportRequestGateway implements OnGatewayInit, OnGatewayConnection {
    constructor(private readonly service: SupportRequestService) {}

    @WebSocketServer()
    server: Server;

    afterInit(server: Server) {
      console.log('SocketIO initialized');
    }

    handleConnection(client: Socket) {
      console.log(`Client connected: ${client.id}`);
    }

    // 🔥 Отправка нового сообщения
    @SubscribeMessage('addMessage')
    async handleAddMessage(client: Socket, payload: { requestId: number, author: number, text: string }) {
      const message = await this.service.addMessage(payload.requestId, payload.author, payload.text);
      this.server.to(`chat-${payload.requestId}`).emit('newMessage', message);
    }

    // 🔥 Подписка на чат
    @SubscribeMessage('subscribeToChat')
    handleSubscribeToChat(client: Socket, payload: { requestId: number }) {
      client.join(`chat-${payload.requestId}`);

      // // 🔥 Ставим сообщения как прочитанные при подключении сотрудника
      // this.service.markMessagesAsRead(payload.requestId);
    }

    // 🔥 Отписка от чата
    @SubscribeMessage('unsubscribeFromChat')
    handleUnsubscribeFromChat(client: Socket, payload: { requestId: number }) {
      client.leave(`chat-${payload.requestId}`);
    }

    // 🔥 Закрытие чата
    @SubscribeMessage('closeRequest')
    async handleCloseRequest(client: Socket, payload: { requestId: number }) {
      await this.service.closeRequest(payload.requestId);
      this.server.to(`chat-${payload.requestId}`).emit('requestClosed');
    }

    // 🔥 Маркеры прочтения сообщений
    // @SubscribeMessage('markMessagesAsRead')
    // async handleMarkMessagesAsRead(client: Socket, payload: { requestId: number }) {
    //   await this.service.markMessagesAsRead(payload.requestId);
    //   this.server.to(`chat-${payload.requestId}`).emit('messagesMarkedAsRead');
    // }
}