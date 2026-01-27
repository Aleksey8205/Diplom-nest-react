import io from 'socket.io-client';

let socket: any = null;

const API_URL = import.meta.env.VITE_API_URL ?? "";

export const connectSocket = () => {
  if (!socket) {
    socket = io(`${API_URL}`, {
      withCredentials: true,
      transports: ['websocket', 'polling'],
    });
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};