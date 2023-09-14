import { useState } from 'react';
import { ColorPicker, useColor } from 'react-color-palette';

import Canvas from '@/components/Canvas';
import { Slider } from '@/components/ui/Slider';
import { socket } from '@/lib/socket';
import { useMembersStore } from '@/store/membersStore';

const GameRoom = () => {
  const [colorClient, setColorClient] = useColor('black');
  const [widthClient, setWidthClient] = useState<number>(5);

  const members = useMembersStore((state) => state.members);

  return (
    <div className="flex w-full flex-row justify-center gap-4">
      <div className="flex flex-col gap-8">
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
        <div className="flex flex-col">
          {members.map(({ id, username }) => (
            <span key={id}>{username}</span>
          ))}
        </div>
      </div>
      <Canvas colorClient={colorClient} widthClient={widthClient} />
    </div>
  );
};

export default GameRoom;
