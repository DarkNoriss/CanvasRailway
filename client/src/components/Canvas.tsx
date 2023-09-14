import { useEffect } from 'react';
import type { IColor } from 'react-color-palette';

import { useDraw } from '@/hooks/useDraw';
import { drawLine } from '@/lib/drawLine';
import { socket } from '@/lib/socket';
import type { Draw, DrawLine } from '@/types/typing';

type CanvasProps = {
  colorClient: IColor;
  widthClient: number;
};

const Canvas = ({ colorClient, widthClient }: CanvasProps) => {
  const createLine = ({ prevPoint, currentPoint, ctx }: Draw) => {
    socket.emit('draw-line', {
      prevPoint,
      currentPoint,
      color: colorClient,
      width: widthClient,
    });
    drawLine({
      prevPoint,
      currentPoint,
      ctx,
      color: colorClient,
      width: widthClient,
    });
  };

  const { canvasRef, onMouseDown, clear } = useDraw(createLine);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');

    socket.emit('client-ready');

    socket.on('get-canvas-state', () => {
      if (!canvasRef.current?.toDataURL()) return;

      socket.emit('canvas-state', canvasRef.current.toDataURL());
    });

    socket.on('canvas-state-from-server', (state: string) => {
      const img = new Image();
      img.src = state;
      img.onload = () => {
        ctx?.drawImage(img, 0, 0);
      };
    });

    socket.on(
      'draw-line',
      ({ prevPoint, currentPoint, color, width }: DrawLine) => {
        if (!ctx) return;
        drawLine({
          prevPoint,
          currentPoint,
          ctx,
          color,
          width,
        });
      },
    );

    socket.on('clear', clear);

    return () => {
      socket.off('get-canvas-state');
      socket.off('canvas-state-from-server');
      socket.off('draw-line');
      socket.off('clear');
    };
  }, [canvasRef, clear]);

  return (
    <canvas
      onMouseDown={onMouseDown}
      ref={canvasRef}
      width={750}
      height={750}
      className="rounded-sm border-black bg-gray-200"
    />
  );
};

export default Canvas;
