'use client';

import 'react-color-palette/css';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import GameLobby from '@/components/game/GameLobby';
import GamePickingWord from '@/components/game/GamePickingWord';
import GamePlaying from '@/components/game/GamePlaying';
import MemberList from '@/components/MemberList';
import { useGameStateStore } from '@/store/gameStatusStore';
import { useUserStore } from '@/store/userStore';

type GameStateProps = typeof gameState;
const gameState = {
  GAME_LOBBY: <GameLobby />,
  GAME_PICKING: <GamePickingWord />,
  GAME_PLAYING: <GamePlaying />,
};

const Page = () => {
  const router = useRouter();

  const user = useUserStore((state) => state.user);
  const useGameState = useGameStateStore((state) => state.gameState);

  const currentState = gameState[useGameState as keyof GameStateProps];

  useEffect(() => {
    if (!user) router.replace('/');
  }, [router, user]);

  if (!user) return null;

  return (
    <div className="flex flex-row">
      <MemberList />
      <div className="flex-1">{currentState}</div>
      <div className="flex-[0_0_20vw]">Room chat...</div>
    </div>
  );
};

export default Page;
