import io from 'socket.io-client';

let socketInstance: any | null = null;

const API_URL = import.meta.env.VITE_API_URL ?? "";

export function connectSocket(chatId: number, callbacks: {
  onConnect?: () => void;
  onNewMessage?: (message: any) => void;
  onMarkedAsRead?: () => void;
}) {
  if (!socketInstance) {
    socketInstance = io(`${API_URL}?chatId=${chatId}`, {
      withCredentials: true,
      transports: ['websocket', 'polling'],
    });

    if (callbacks.onConnect) {
      socketInstance.on('connect', callbacks.onConnect);
      console.log(`Subscribed to room: chat-${chatId}`);
    }

    if (callbacks.onNewMessage) {
      socketInstance.on('newMessage', callbacks.onNewMessage);
    }

    if (callbacks.onMarkedAsRead) {
      socketInstance.on('messagesMarkedAsRead', callbacks.onMarkedAsRead);
    }
  }
}

export function disconnectSocket() {
  if (socketInstance) {
    socketInstance.disconnect();
    socketInstance = null;
  }
}

export function emitMessage(data: any) {
  if (socketInstance) {
    socketInstance.emit('sendMessage', data);
  }
}

export function markMessagesAsRead(data: any) {
  if (socketInstance) {
    socketInstance.emit('markMessagesAsRead', data);
  }
}

