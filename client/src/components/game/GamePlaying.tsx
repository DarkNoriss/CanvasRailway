import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import Canvas from '@/components/Canvas';
import { socket } from '@/lib/socket';

const GamePlaying = () => {
  const { roomId } = useParams();

  // const roomWord = useRoomWordStore((state) => state.roomWord);
  const [, setCanvasLoading] = useState(true);

  useEffect(() => {
    socket.emit('client-ready', { roomId });

    socket.on('client-loaded', () => setCanvasLoading(false));

    return () => {
      socket.off('client-loaded');
    };
  }, [roomId]);

  return (
    <div className="flex h-screen max-h-[80vh] w-full flex-row justify-center gap-2">
      <Canvas />
    </div>
  );
};

export default GamePlaying;
