import { useEffect } from 'react';

import TypeWord from '@/components/TypeWord';
import { socket } from '@/lib/socket';
import { useGameStateStore } from '@/store/gameStatusStore';
import { useRoomWordStore } from '@/store/roomWordStore';
import { useUserStore } from '@/store/userStore';

const GamePickingWord = () => {
  const user = useUserStore((state) => state.user);
  const setGameState = useGameStateStore((state) => state.setGameState);
  const setRoomWord = useRoomWordStore((state) => state.setRoomWord);

  useEffect(() => {
    socket.on('start-game', ({ roomWord }) => {
      setRoomWord(roomWord);
      setGameState('GAME_PLAYING');
    });

    return () => {
      socket.off('start-game');
    };
  }, [setGameState, setRoomWord]);

  return (
    <div className="flex justify-center">
      {user?.isDrawing ? (
        <div className="flex flex-col justify-center">
          <TypeWord />
        </div>
      ) : (
        <span>Player is entering a word...</span>
      )}
    </div>
  );
};

export default GamePickingWord;
