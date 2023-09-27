import { create } from 'zustand';

type RoomWordStoreType = {
  roomWord: string;
  setRoomWord: (newWord: string) => void;
};

export const useRoomWordStore = create<RoomWordStoreType>((set) => ({
  roomWord: '',
  setRoomWord: (newWord) => set({ roomWord: newWord }),
}));
