'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { ColorResult } from 'react-color';

import { Cursor } from '@/components/ui/Cursor';
import { Slider } from '@/components/ui/Slider';
import { useDraw } from '@/hooks/useDraw';
import { drawLine } from '@/lib/drawLine';
import { socket } from '@/lib/socket';
import { useUserStore } from '@/store/userStore';

type DrawLine = Draw & {
  color: ColorResult['rgb'];
  width: number;
};

const Page = () => {
  const router = useRouter();

  const user = useUserStore((state) => state.user);

  const [colorClient, setColorClient] = useState<ColorResult['rgb']>({
    r: 0,
    g: 0,
    b: 0,
    a: 1,
  });
  const [widthClient, setWidthClient] = useState<number>(5);

  useEffect(() => {
    if (!user) router.replace('/');
  }, [router, user]);

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
    <div className="flex flex-row gap-4">
      <Cursor size={widthClient} />
      <div className="flex flex-col items-center justify-center gap-8">
        {/* <SketchPicker
          color={colorClient}
          onChange={(newColor: ColorResult) => setColorClient(newColor.rgb)}
        /> */}
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
      <canvas
        onMouseDown={onMouseDown}
        ref={canvasRef}
        width={750}
        height={750}
        className="rounded-sm border-black bg-gray-200"
      />
    </div>
  );
};

export default Page;
