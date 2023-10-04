import { instrument } from '@socket.io/admin-ui';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

import { addWord, createRoom } from './data/gameRooms';
import { getRoomMembers, setUserDrawing } from './data/users';
import type { RoomCanvas, RoomData, RoomId, SubmitWordType } from './types';
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

    socket.to(adminMember.id).emit('get-canvas');
  });

  socket.on('send-canvas', ({ canvas, roomId }: RoomCanvas) => {
    const members = getRoomMembers(roomId);
    const lastMember = members[members.length - 1];

    if (!lastMember) return;

    socket.to(lastMember.id).emit('load-canvas', { canvas });
  });

  socket.on('start-lobby', ({ roomId }: RoomId) => {
    socket.emit('start-lobby');
    socket.to(roomId).emit('start-lobby');
    const roomWord = '';
    const gameStarted = true;
    const gameStage = 'picking';

    const room = {
      roomId,
      roomWord,
      gameStarted,
      gameStage,
    };

    createRoom(room);
    setUserDrawing(roomId);

    const members = getRoomMembers(roomId);

    socket.emit('update-members', { members });
    socket.to(roomId).emit('update-members', { members });
  });

  socket.on('submit-word', ({ roomId, roomWord }: SubmitWordType) => {
    addWord({ roomId, roomWord });

    socket.emit('start-game', { roomWord });
    socket.to(roomId).emit('start-game', { roomWord });
  });

  socket.on(
    'canvas-whole',
    ({ wholeCanvas, roomId }: { wholeCanvas: string; roomId: string }) => {
      socket.to(roomId).emit('canvas-whole', { wholeCanvas });
    },
  );

  socket.on('disconnect', () => {
    leaveRoom(socket);
  });
});

instrument(io, {
  auth: false,
});

const PORT = process.env.PORT || 3001;

server.listen(PORT);
