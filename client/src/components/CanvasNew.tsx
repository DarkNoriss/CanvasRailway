import { useParams } from 'next/navigation';
import { useRef, useState } from 'react';
import type { CanvasPath, ReactSketchCanvasRef } from 'react-sketch-canvas';
import { ReactSketchCanvas } from 'react-sketch-canvas';

import { socket } from '@/lib/socket';

const CanvasNew = () => {
  const [paths, setPaths] = useState<CanvasPath[]>([]);
  const [strokeWidth, setStrokeWidth] = useState<number>(4);
  const [strokColor, setStrokeColor] = useState<string>('black');

  const canvas = useRef<ReactSketchCanvasRef | null>(null);

  const { roomId } = useParams();

  const handleClear = () => {
    canvas.current?.clearCanvas();
    socket.emit('canvas-clear', { roomId });
  };

  const handleUndo = () => {
    canvas.current?.undo();
    socket.emit('canvas-undo', { roomId });
  };

  const handleRedo = () => {
    canvas.current?.redo();
    socket.emit('canvas-redo', { roomId });
  };

  const handleOnChange = (updatedPaths: CanvasPath[]) => {
    console.log(updatedPaths);
  };

  return (
    <>
      <ReactSketchCanvas
        ref={canvas}
        width="600"
        height="400"
        strokeWidth={strokeWidth}
        strokeColor={strokColor}
        onChange={handleOnChange}
      />

      <button onClick={handleClear} type="button">
        CLEAR
      </button>

      <button onClick={handleClear} type="button">
        CLEAR
      </button>

      <button onClick={handleClear} type="button">
        CLEAR
      </button>
    </>
  );
};

export default CanvasNew;
