import { create } from 'zustand';

type GameStateStoreType = {
  gameState: 'GAME_LOBBY' | 'GAME_ROOM' | 'GAME_PICKING';
  setGameState: (state: 'GAME_LOBBY' | 'GAME_ROOM' | 'GAME_PICKING') => void;
};

export const useGameStateStore = create<GameStateStoreType>((set) => ({
  gameState: 'GAME_LOBBY',
  setGameState: (state) => set({ gameState: state }),
}));
