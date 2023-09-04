import { useEffect, useRef, useState } from 'react';

export const useDraw = (
  onDraw: ({ ctx, currentPoint, prevPoint }: Draw) => void,
) => {
  const [mouseDown, setMouseDown] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prevPointRef = useRef<null | Point>(null);

  const onMouseDown = () => setMouseDown(true);

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    const computePointInCanvas = (event: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // eslint-disable-next-line consistent-return
      return { x, y };
    };

    const handler = (event: MouseEvent) => {
      if (!mouseDown) return;

      const currentPoint = computePointInCanvas(event);

      const ctx = canvasRef.current?.getContext('2d');
      if (!ctx || !currentPoint) return;

      onDraw({ ctx, currentPoint, prevPoint: prevPointRef.current });
      prevPointRef.current = currentPoint;
    };

    const mouseUpHandler = () => {
      setMouseDown(false);
      prevPointRef.current = null;
    };

    canvasRef.current?.addEventListener('mousemove', handler);
    window.addEventListener('mouseup', mouseUpHandler);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      canvasRef.current?.removeEventListener('mousemove', handler);
      window.removeEventListener('mouseup', mouseUpHandler);
    };
  }, [onDraw, mouseDown]);

  return { canvasRef, onMouseDown, clear };
};
