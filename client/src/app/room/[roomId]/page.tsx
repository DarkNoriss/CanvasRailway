'use client';

import 'react-color-palette/css';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import GameLobby from '@/components/game/GameLobby';
import GamePickingWord from '@/components/game/GamePickingWord';
import GamePlaying from '@/components/game/GamePlaying';
import MemberList from '@/components/MemberList';
import RoomChat from '@/components/RoomChat';
import { cn } from '@/lib/utils';
import { useGameStateStore } from '@/store/gameStatusStore';
import { useUserStore } from '@/store/userStore';

type GameStateProps = typeof gameStates;
const gameStates = {
  GAME_LOBBY: <GameLobby />,
  GAME_PICKING: <GamePickingWord />,
  GAME_PLAYING: <GamePlaying />,
};

const Page = () => {
  const router = useRouter();

  const user = useUserStore((state) => state.user);
  const gameState = useGameStateStore((state) => state.gameState);

  const currentState = gameStates[gameState as keyof GameStateProps];

  const dontDrawForDrawingUser =
    gameState === 'GAME_PICKING' && user?.isDrawing === true;

  useEffect(() => {
    if (!user) router.replace('/');
  }, [router, user]);

  if (!user) return null;

  return (
    <div
      className={cn(
        'flex h-full w-full flex-row lg:max-h-[80vh]',
        dontDrawForDrawingUser ? '' : 'border',
      )}
    >
      {dontDrawForDrawingUser ? (
        <div className="flex w-full flex-1 flex-row items-center justify-center">
          {currentState}
        </div>
      ) : (
        <>
          <MemberList />
          <div className="flex w-full flex-1 flex-row items-center justify-center border-x">
            {currentState}
          </div>
          <RoomChat />
        </>
      )}
    </div>
  );
};

export default Page;
