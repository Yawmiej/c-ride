import { io, type Socket } from 'socket.io-client';
import { env } from '@/shared/config/env';

let socket: Socket | undefined;

export function getSocket() {
  socket ??= io(env.VITE_SOCKET_URL, {
    autoConnect: false,
    transports: ['websocket'],
  });

  return socket;
}

export function connectSocket() {
  const client = getSocket();

  if (!client.connected) {
    client.connect();
  }

  return client;
}

export function disconnectSocket() {
  socket?.disconnect();
}
