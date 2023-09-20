import { useRef, useState } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';

const CanvasNew = () => {
  const [strokeWidth, setStrokeWidth] = useState<number>(4);
  const [strokColor, setStrokeColor] = useState<string>('black');

  const canvas = useRef(null);

  const handleClear = () => {
    if (!canvas.current) return
      canvas.current.clearCanvas()
  
    
  return (
    <>
      <ReactSketchCanvas
        ref={canvas}
        width="600"
        height="400"
        strokeWidth={strokeWidth}
        strokeColor={strokColor}
      />
      {canvas !== null ? (
        <button onClick={handleClear} type="button">
          CLEAR
        </button>
      )}
    </>
  );
};

export default CanvasNew;
