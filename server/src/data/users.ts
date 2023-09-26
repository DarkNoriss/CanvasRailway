import { produce } from 'immer';

import type { User } from '@/types';

let userList: User[] = [];

const getUser = (userId: string) => userList.find((user) => user.id === userId);

const addUser = (user: User) => {
  userList = produce(userList, (draftState) => {
    draftState.push(user);
  });
};

const removeUser = (userId: string) => {
  userList = produce(userList, (draftState) => {
    draftState.filter((user) => user.id !== userId);
  });
};

const getRoomMembers = (roomId: string) =>
  userList.filter((member) => member.roomId === roomId);

const setUserDrawing = async (roomId: string) => {
  userList = produce(userList, (draftState) => {
    const membersList = getRoomMembers(roomId);

    const drawing = membersList[Math.floor(Math.random() * membersList.length)];

    if (!drawing) return;

    const updatedUser = draftState.find((user) => user.id === drawing.id);
    if (updatedUser) {
      updatedUser.isDrawing = true;
    }
  });
};

export { addUser, getRoomMembers, getUser, removeUser, setUserDrawing };
