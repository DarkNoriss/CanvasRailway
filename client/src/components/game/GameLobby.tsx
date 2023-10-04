import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/Button';
import { socket } from '@/lib/socket';
import { useMembersStore } from '@/store/membersStore';

import Countdown from '../Countdown';

const GameLobby = () => {
  const [starting, setStarting] = useState(false);
  const members = useMembersStore((state) => state.members);

  const { roomId } = useParams();

  useEffect(() => {
    socket.on('start-lobby', () => setStarting(true));

    return () => {
      socket.off('start-lobby');
    };
  }, []);

  const handleOnClick = () => {
    socket.emit('start-lobby', { roomId });
  };

  return (
    <>
      <Button onClick={handleOnClick} className="p-8 text-4xl">
        START GAME
      </Button>
      {starting && <Countdown />}
    </>
  );
};

export default GameLobby;
