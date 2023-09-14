import { Slider } from '@radix-ui/react-slider';
import { useState } from 'react';
import { ColorPicker, useColor } from 'react-color-palette';

import { socket } from '@/lib/socket';

import Canvas from './Canvas';
import { Cursor } from './ui/Cursor';

const GameRoom = () => {
  const [colorClient, setColorClient] = useColor('black');
  const [widthClient, setWidthClient] = useState<number>(5);

  return (
    <div className="flex flex-row gap-4">
      <Cursor size={widthClient} />
      <div className="flex flex-col items-center justify-center gap-8">
        <ColorPicker
          color={colorClient}
          onChange={setColorClient}
          hideInput={['hsv']}
        />
        <Slider
          defaultValue={[widthClient]}
          onValueChange={(value) => setWidthClient(value[0] ?? 5)}
          min={1}
        />
        <button
          className="rounded-sm bg-gray-600 px-4 py-2"
          type="button"
          onClick={() => socket.emit('clear')}
        >
          Clear canvas
        </button>
      </div>
      <Canvas colorClient={colorClient} widthClient={widthClient} />
    </div>
  );
};

export default GameRoom;
