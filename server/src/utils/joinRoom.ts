import type { Socket } from 'socket.io';

import type { User } from '@/types';

import { addUser, getRoomMembers } from '../data/users';

export const joinRoom = (socket: Socket, roomId: string, user: User) => {
  socket.join(roomId);

  addUser({ ...user });

  const members = getRoomMembers(roomId);

  socket.emit('room-joined', { user, roomId, members });
  socket.to(roomId).emit('update-members', { members });
};
