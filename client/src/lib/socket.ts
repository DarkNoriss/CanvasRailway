import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';

const SERVER =
  process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001';

export const socket: Socket = io(SERVER);
