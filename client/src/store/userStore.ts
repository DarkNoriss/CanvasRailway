import { create } from 'zustand';

export type User = {
  id: string;
  username: string;
  isAdmin: boolean;
  isDrawing: boolean;
};

type UserStoreType = {
  user: User | null;
  setUser: (user: User) => void;
};

export const useUserStore = create<UserStoreType>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
