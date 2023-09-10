import { create } from 'zustand';

import type { User } from './userStore';

type MembersStoreType = {
  members: User[];
  setMembers: (members: User[]) => void;
};

export const useMembersStore = create<MembersStoreType>((set) => ({
  members: [],
  setMembers: (members) => set({ members }),
}));
