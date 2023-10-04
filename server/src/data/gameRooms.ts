import { produce } from 'immer';

import type { GameRoomsType, SubmitWordType } from '@/types';

let gameRooms: GameRoomsType[] = [];

const createRoom = (room: GameRoomsType) => {
  gameRooms = produce(gameRooms, (draftState) => {
    draftState.push(room);
  });
};

const addWord = ({ roomId, roomWord }: SubmitWordType) => {
  gameRooms = produce(gameRooms, (draftState) => {
    const updatedRoom = draftState.find((room) => room.roomId === roomId);

    if (!updatedRoom) return;
    updatedRoom.roomWord = roomWord;
  });
};

export { addWord, createRoom };
