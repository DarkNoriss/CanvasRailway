import { instrument } from '@socket.io/admin-ui';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

import { getRoomMembers, setUserDrawing } from './data/users';
import type { RoomCanvas, RoomData, RoomDraw, RoomId } from './types';
import { joinRoom } from './utils/joinRoom';
import { leaveRoom } from './utils/leaveRoom';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  socket.on('create-room', ({ roomId, username }: RoomData) => {
    const user = {
      id: socket.id,
      username,
      roomId,
      isAdmin: true,
      isDrawing: false,
    };

    joinRoom(socket, roomId, user);
  });

  socket.on('join-room', ({ roomId, username }: RoomData) => {
    const members = getRoomMembers(roomId);

    if (members.length <= 0) {
      socket.emit('join-room-failed');
      return;
    }
    const user = {
      id: socket.id,
      username,
      roomId,
      isAdmin: false,
      isDrawing: false,
    };

    joinRoom(socket, roomId, user);
  });

  socket.on('client-ready', ({ roomId }: RoomId) => {
    const members = getRoomMembers(roomId);

    if (members.length === 1) {
      socket.emit('client-loaded');
      return;
    }

    const adminMember = members[0];

    if (!adminMember) return;

    socket.to(adminMember.id).emit('get-canvas-paths');
  });

  socket.on('send-canvas-paths', ({ canvasPaths, roomId }: RoomCanvas) => {
    const members = getRoomMembers(roomId);
    const lastMember = members[members.length - 1];

    if (!lastMember) return;

    socket.to(lastMember.id).emit('canvas-paths-from-server', { canvasPaths });
  });

  socket.on('canvas-draw', ({ canvasPaths, roomId }: RoomDraw) => {
    socket.to(roomId).emit('canvas-draw', { canvasPaths });
  });

  socket.on('canvas-undo', ({ roomId }: RoomId) => {
    socket.to(roomId).emit('canvas-undo');
  });

  socket.on('canvas-redo', ({ roomId }: RoomId) => {
    socket.to(roomId).emit('canvas-redo');
  });

  socket.on('canvas-clear', ({ roomId }: RoomId) => {
    socket.to(roomId).emit('canvas-clear');
  });

  socket.on('start', ({ roomId }: RoomId) => {
    socket.emit('start');
    socket.to(roomId).emit('start');

    setUserDrawing(roomId);

    const members = getRoomMembers(roomId);

    socket.emit('update-members', { members });
    socket.to(roomId).emit('update-members', { members });
  });

  socket.on('disconnect', () => {
    leaveRoom(socket);
  });
});

instrument(io, {
  auth: false,
});

const PORT = process.env.PORT || 3001;

server.listen(PORT);
