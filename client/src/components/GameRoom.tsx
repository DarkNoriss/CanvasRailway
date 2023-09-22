import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ColorPicker, useColor } from 'react-color-palette';
import type { ReactSketchCanvasRef } from 'react-sketch-canvas';

import Canvas from '@/components/Canvas';
import CanvasButtons from '@/components/CanvasButtons';
import { Slider } from '@/components/ui/Slider';
import { socket } from '@/lib/socket';

const GameRoom = () => {
  const [strokeColor, setStrokeColor] = useColor('black');
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [, setCanvasLoading] = useState(true);

  const canvas = useRef<ReactSketchCanvasRef | null>(null);

  const { roomId } = useParams();

  useEffect(() => {
    socket.emit('client-ready', { roomId });

    socket.on('client-loaded', () => setCanvasLoading(false));

    return () => {
      socket.off('client-loaded');
    };
  }, [roomId]);

  return (
    <div className="flex h-screen max-h-[80vh] w-full flex-row justify-center gap-2">
      <div className="rounded-xl bg-[#121212]">
        <ColorPicker
          color={strokeColor}
          onChange={setStrokeColor}
          hideInput={['hsv']}
        />
        <Slider
          defaultValue={[5]}
          onValueChange={(value) => setStrokeWidth(value[0] ?? 5)}
          min={1}
          className="mx-auto mb-4 w-[80%]"
        />
        <CanvasButtons canvas={canvas} />
      </div>

      <Canvas
        canvas={canvas}
        strokeWidth={strokeWidth}
        strokeColor={strokeColor.hex}
      />
    </div>
  );
};

export default GameRoom;
