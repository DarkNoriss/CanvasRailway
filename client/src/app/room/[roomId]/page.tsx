'use client';

import 'react-color-palette/css';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import GameLobby from '@/components/GameLobby';
import GameRoom from '@/components/GameRoom';
import { socket } from '@/lib/socket';
import { useGameStateStore } from '@/store/gameStatusStore';
import { useMembersStore } from '@/store/membersStore';
import { useUserStore } from '@/store/userStore';

type GameStateProps = typeof gameState;
const gameState = {
  GAME_LOBBY: <GameLobby />,
  GAME_ROOM: <GameRoom />,
};

const Page = () => {
  const router = useRouter();

  const user = useUserStore((state) => state.user);
  const setMembers = useMembersStore((state) => state.setMembers);
  const useGameState = useGameStateStore((state) => state.gameState);

  const currentState = gameState[useGameState as keyof GameStateProps];

  useEffect(() => {
    if (!user) router.replace('/');
  }, [router, user]);

  useEffect(() => {
    socket.on('update-members', ({ members }) => {
      setMembers(members);
    });

    return () => {
      socket.off('update-members');
    };
  }, [setMembers]);

  if (user) return currentState;
  return null;
};

export default Page;
