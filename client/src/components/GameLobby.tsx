import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/Button';
import { socket } from '@/lib/socket';
import { useMembersStore } from '@/store/membersStore';

import Countdown from './Countdown';

const GameLobby = () => {
  const [starting, setStarting] = useState(false);
  const members = useMembersStore((state) => state.members);

  const { roomId } = useParams();

  useEffect(() => {
    socket.on('start', () => setStarting(true));

    return () => {
      socket.off('start');
    };
  }, []);

  const handleOnClick = () => {
    socket.emit('start', { roomId });
  };

  return (
    <div className="flex flex-row">
      <div className="flex flex-col px-4">
        <span>Members: </span>
        <ol>
          {members.map(({ id, username }) => (
            <li key={id} className="ml-4 list-disc">
              {username}
            </li>
          ))}
        </ol>
      </div>
      <div>
        <Button onClick={handleOnClick}>START GAME</Button>
      </div>
      {starting && <Countdown />}
    </div>
  );
};

export default GameLobby;
