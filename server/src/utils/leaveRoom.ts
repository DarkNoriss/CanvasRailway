import type { Socket } from 'socket.io';

import { getRoomMembers, getUser, removeUser } from '../data/users';

export const leaveRoom = (socket: Socket) => {
  const user = getUser(socket.id);
  if (!user) return;

  const { id, roomId } = user;

  removeUser(id);
  const members = getRoomMembers(roomId);

  socket.to(roomId).emit('update-members', { members });
  socket.leave(roomId);
};
