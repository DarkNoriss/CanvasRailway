import { useParams } from 'next/navigation';
import type { MutableRefObject } from 'react';
import { useEffect } from 'react';
import type { CanvasPath, ReactSketchCanvasRef } from 'react-sketch-canvas';
import { ReactSketchCanvas } from 'react-sketch-canvas';

import { socket } from '@/lib/socket';

type CanvasProps = {
  canvas: MutableRefObject<ReactSketchCanvasRef | null>;
  strokeWidth: number;
  strokeColor: string;
};
const CanvasNew = ({ canvas, strokeWidth, strokeColor }: CanvasProps) => {
  const { roomId } = useParams();

  useEffect(() => {
    socket.on('canvas-draw', ({ canvasPaths }) => {
      canvas.current?.loadPaths(canvasPaths);
    });

    return () => {
      socket.off('canvas-draw');
    };
  }, [canvas]);

  const handleOnStroke = (canvasPaths: CanvasPath) => {
    if (canvasPaths.paths.length === 1) return;

    socket.emit('canvas-draw', { canvasPaths, roomId });
  };

  return (
    <ReactSketchCanvas
      ref={canvas}
      strokeWidth={strokeWidth}
      strokeColor={strokeColor}
      onStroke={handleOnStroke}
      className="rounded"
    />
  );
};

export default CanvasNew;
