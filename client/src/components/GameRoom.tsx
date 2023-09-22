import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ColorPicker, useColor } from 'react-color-palette';
import type { ReactSketchCanvasRef } from 'react-sketch-canvas';

import CanvasButtons from '@/components/CanvasButtons';
import CanvasNew from '@/components/CanvasNew';
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
    socket.on('get-canvas-paths', async () => {
      const canvasPaths = await canvas.current?.exportPaths();
      if (!canvasPaths) return;

      socket.emit('send-canvas-paths', { canvasPaths, roomId });
    });
    socket.on('canvas-paths-from-server', ({ canvasPaths }) => {
      if (!canvas.current) return;

      canvas.current.loadPaths(canvasPaths);
    });

    return () => {
      socket.off('client-loaded');
      socket.off('get-canvas-paths');
      socket.off('canvas-paths-from-server');
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

      <CanvasNew
        canvas={canvas}
        strokeWidth={strokeWidth}
        strokeColor={strokeColor.hex}
      />
    </div>
  );
};

export default GameRoom;
