'use client';

import 'react-color-palette/css';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import GameLobby from '@/components/GameLobby';
import GameRoom from '@/components/GameRoom';
import { useGameStateStore } from '@/store/gameStatusStore';
import { useUserStore } from '@/store/userStore';

type GameStateProps = typeof gameState;
const gameState = {
  GAME_LOBBY: <GameLobby />,
  GAME_ROOM: <GameRoom />,
};

const Page = () => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const useGameState = useGameStateStore((state) => state.gameState);
  const currentState = gameState[useGameState as keyof GameStateProps];

  useEffect(() => {
    if (!user) router.replace('/');
  }, [router, user]);

  if (user) return currentState;
  return null;
};

export default Page;
