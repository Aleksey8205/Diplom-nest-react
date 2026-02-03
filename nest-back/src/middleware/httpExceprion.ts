import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

@Catch(WsException, HttpException)
export class GlobalExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToWs();
    const client = ctx.getClient();
    const data = ctx.getData();

    if (exception instanceof WsException) {
      console.error('WebSocket Exception:', exception.message); // Обращаемся к свойству message
    } else if (exception instanceof HttpException) {
      console.error('HTTP Exception:', exception.message); // То же самое
    } else {
      console.error('Uncaught Exception:', exception);
    }

    client.emit('exception', { status: 'error', message: 'Internal server error' });
  }
}