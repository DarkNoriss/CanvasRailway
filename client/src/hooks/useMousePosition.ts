import { useEffect, useState } from 'react';

type MousePositionType = {
  x: number | null;
  y: number | null;
};
export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState<MousePositionType>({
    x: null,
    y: null,
  });

  useEffect(() => {
    const mouseMoveHandler = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      setMousePosition({ x: clientX, y: clientY });
    };
    document.addEventListener('mousemove', mouseMoveHandler);

    return () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
    };
  }, []);

  return mousePosition;
};
