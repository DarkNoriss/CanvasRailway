'use client';

import 'react-color-palette/css';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import GameLobby from '@/components/game/GameLobby';
import GamePickingWord from '@/components/game/GamePickingWord';
import GamePlaying from '@/components/game/GamePlaying';
import { socket } from '@/lib/socket';
import { useGameStateStore } from '@/store/gameStatusStore';
import { useMembersStore } from '@/store/membersStore';
import type { User } from '@/store/userStore';
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
  const setUser = useUserStore((state) => state.setUser);
  const setMembers = useMembersStore((state) => state.setMembers);
  const useGameState = useGameStateStore((state) => state.gameState);

  const currentState = gameState[useGameState as keyof GameStateProps];

  useEffect(() => {
    if (!user) router.replace('/');
  }, [router, user]);

  useEffect(() => {
    socket.on('update-members', ({ members }) => {
      const updatedUser = members.find((u: User) => u.id === user?.id);
      setUser(updatedUser);
      setMembers(members);
    });

    return () => {
      socket.off('update-members');
    };
  }, [setMembers, setUser, user?.id]);

  if (user) return currentState;
  return null;
};

export default Page;
