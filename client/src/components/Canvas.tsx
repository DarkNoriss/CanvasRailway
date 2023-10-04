import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import CanvasDraw from 'react-canvas-draw';

import { socket } from '@/lib/socket';
import { useUserStore } from '@/store/userStore';

const Canvas = () => {
  const { roomId } = useParams();

  const user = useUserStore((state) => state.user);

  const [size, setSize] = useState({ height: 200, width: 200 });
  const [cavnasState, setCavnasState] = useState<string>('');

  const container = useRef<HTMLDivElement | null>(null);

  const canvasRef = useRef<CanvasDraw | null>(null);

  useEffect(() => {
    socket.on('canvas-whole', ({ wholeCanvas }) => {
      setCavnasState(wholeCanvas);
    });

    socket.on('get-canvas', async () => {
      const canvas = await canvasRef.current?.getSaveData();
      if (!canvas) return;

      socket.emit('send-canvas', { canvas, roomId });
    });

    socket.on('load-canvas', ({ canvas }) => {
      setCavnasState(canvas);
    });

    return () => {
      socket.off('get-canvas');
      socket.off('canvas-whole');
    };
  }, [roomId]);

  const handleResize = () => {
    if (container.current) {
      const height = container.current.clientHeight;
      const width = container.current.clientWidth;
      setSize({ height, width });
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    handleResize();
  }, []);

  const gay = (canvas: CanvasDraw) => {
    if (!user?.isDrawing) return;
    const wholeCanvas = canvas.getSaveData();

    socket.emit('canvas-whole', { wholeCanvas, roomId });
  };

  return (
    <div ref={container} className="h-full w-full">
      <CanvasDraw
        ref={canvasRef}
        hideGrid
        canvasHeight={size.height}
        canvasWidth={size.width}
        disabled={!user?.isDrawing}
        onChange={gay}
        saveData={cavnasState}
      />
    </div>
  );
};

export default Canvas;
