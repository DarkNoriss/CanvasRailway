import { useMousePosition } from '@/hooks/useMousePosition';

type CursorType = {
  size: number;
};

export const Cursor = ({ size }: CursorType) => {
  const { x, y } = useMousePosition();

  return (
    <div
      style={{ left: `${x}px`, top: `${y}px`, height: `${size}px` }}
      className="pointer-events-none fixed z-50 aspect-square -translate-x-2/4 -translate-y-2/4 rounded-full border border-black will-change-auto"
    />
  );
};
