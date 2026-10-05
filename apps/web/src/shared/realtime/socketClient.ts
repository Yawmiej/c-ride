import { io, type Socket } from 'socket.io-client';
import { getAccessToken } from '@/shared/api/auth-token';
import { env } from '@/shared/config/env';

let socket: Socket | undefined;

export function getSocket() {
  socket ??= io(`${env.VITE_SOCKET_URL}/rides`, {
    autoConnect: false,
    transports: ['websocket'],
  });

  return socket;
}

export function connectSocket() {
  const client = getSocket();
  const token = getAccessToken();

  client.auth = token ? { token } : {};

  if (!client.connected) {
    client.connect();
  }

  return client;
}

export function disconnectSocket() {
  socket?.disconnect();
}
