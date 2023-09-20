import { useParams } from 'next/navigation';
import { useState } from 'react';
import { ColorPicker, useColor } from 'react-color-palette';

import CanvasOld from '@/components/CanvasOld';
import MemberList from '@/components/MemberList';
import { Slider } from '@/components/ui/Slider';
import { socket } from '@/lib/socket';

const GameRoom = () => {
  const [colorClient, setColorClient] = useColor('black');
  const [widthClient, setWidthClient] = useState<number>(5);

  const { roomId } = useParams();

  return (
    <div className="flex w-full flex-row justify-center gap-4">
      <div className="flex flex-col gap-8">
        <ColorPicker
          color={colorClient}
          onChange={setColorClient}
          hideInput={['hsv']}
          hideAlpha
        />
        <Slider
          defaultValue={[widthClient]}
          onValueChange={(value) => setWidthClient(value[0] ?? 5)}
          min={1}
        />
        <button
          className="rounded-sm bg-gray-600 px-4 py-2"
          type="button"
          onClick={() => socket.emit('clear-canvas', { roomId })}
        >
          Clear canvas
        </button>
        <MemberList />
      </div>
      <CanvasOld colorClient={colorClient} widthClient={widthClient} />
    </div>
  );
};

export default GameRoom;
