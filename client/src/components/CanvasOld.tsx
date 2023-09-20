import { Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { IColor } from 'react-color-palette';

import { Cursor } from '@/components/ui/Cursor';
import { useDraw } from '@/hooks/useDraw';
import type { DrawOptions } from '@/lib/drawLine';
import { drawLine } from '@/lib/drawLine';
import { drawWithDataURL } from '@/lib/drawWithDataURL';
import { socket } from '@/lib/socket';
import { cn } from '@/lib/utils';
import type { Draw } from '@/types/typing';

type CanvasProps = {
  colorClient: IColor;
  widthClient: number;
};

const CanvasOld = ({ colorClient, widthClient }: CanvasProps) => {
  const [canvasLoading, setCanvasLoading] = useState(true);

  const { roomId } = useParams();

  const createLine = ({ prevPoint, currentPoint, ctx }: Draw) => {
    const drawOptions = {
      ctx,
      currentPoint,
      prevPoint,
      color: colorClient,
      width: widthClient,
    };

    drawLine(drawOptions);

    socket.emit('draw', { drawOptions, roomId });
  };

  const { canvasRef, onMouseDown, clear } = useDraw(createLine);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    const ctx = canvasRef.current?.getContext('2d');

    socket.emit('client-ready', { roomId }); // works

    socket.on('client-loaded', () => {
      setCanvasLoading(false);
    });

    socket.on('get-canvas-state', () => {
      const canvasState = canvasRef.current?.toDataURL();
      if (!canvasState) return;

      socket.emit('send-canvas-state', { canvasState, roomId });
    });

    socket.on('canvas-state-from-server', (canvasState: string) => {
      if (!ctx || !canvasElement) return;

      drawWithDataURL(canvasState, ctx, canvasElement);
      setCanvasLoading(false);
    });

    socket.on('update-canvas-state', (drawOptions: DrawOptions) => {
      if (!ctx) return;

      drawLine({ ...drawOptions, ctx });
    });

    socket.on('clear-canvas', clear);

    return () => {
      socket.off('hello');
      socket.off('get-canvas-state');
      socket.off('canvas-state-from-server');
      socket.off('update-canvas-state');
      socket.off('clear-canvas');
    };
  }, [canvasRef, clear, roomId]);

  const handleOnMouseDown = () => {
    if (canvasLoading) return;

    onMouseDown();
  };

  return (
    <div className="relative flex items-center justify-center">
      <Cursor size={widthClient} />
      <canvas
        onMouseDown={handleOnMouseDown}
        ref={canvasRef}
        width={750}
        height={750}
        className={cn(
          'rounded-sm border-black',
          canvasLoading ? 'bg-gray-500' : 'bg-gray-200',
        )}
      />
      {canvasLoading ? (
        <div className="absolute z-20">
          <Loader2 className="h-32 w-32 animate-spin" />
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default CanvasOld;
