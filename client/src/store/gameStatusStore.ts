import { create } from 'zustand';

type GameStateStoreType = {
  gameState: 'GAME_LOBBY' | 'GAME_ROOM';
  setGameState: (state: 'GAME_LOBBY' | 'GAME_ROOM') => void;
};

export const useGameStateStore = create<GameStateStoreType>((set) => ({
  gameState: 'GAME_LOBBY',
  setGameState: (state) => set({ gameState: state }),
}));
