import { useParams } from 'next/navigation';
import { type FC, type MutableRefObject, useEffect } from 'react';
import type { ReactSketchCanvasRef } from 'react-sketch-canvas';

import { Button } from '@/components/ui/Button';
import { socket } from '@/lib/socket';

type CanvasButtonsProps = {
  canvas: MutableRefObject<ReactSketchCanvasRef | null>;
};

const CanvasButtons: FC<CanvasButtonsProps> = ({
  canvas,
}: CanvasButtonsProps) => {
  const { roomId } = useParams();

  useEffect(() => {
    socket.on('canvas-undo', () => canvas.current?.undo());
    socket.on('canvas-redo', () => canvas.current?.redo());
    socket.on('canvas-clear', () => canvas.current?.clearCanvas());

    return () => {
      socket.off('canvas-undo');
      socket.off('canvas-redo');
      socket.off('canvas-clear');
    };
  }, [canvas]);

  const handleUndo = () => {
    if (!canvas.current) return;

    canvas.current.undo();
    socket.emit('canvas-undo', { roomId });
  };

  const handleRedo = () => {
    if (!canvas.current) return;

    canvas.current.redo();
    socket.emit('canvas-redo', { roomId });
  };

  const handleClear = () => {
    if (!canvas.current) return;

    canvas.current.clearCanvas();
    socket.emit('canvas-clear', { roomId });
  };

  return (
    <div className="mx-auto flex w-4/5 flex-col gap-2">
      <Button onClick={handleUndo} type="button">
        UNDO
      </Button>
      <Button onClick={handleRedo} type="button">
        REDO
      </Button>
      <Button onClick={handleClear} type="button">
        CLEAR
      </Button>
    </div>
  );
};

export default CanvasButtons;
