import type { ColorResult } from 'react-color';

type DrawLineProps = Draw & {
  color: ColorResult['rgb'];
  width: number;
};

export const drawLine = ({
  prevPoint,
  currentPoint,
  ctx,
  color,
  width,
}: DrawLineProps) => {
  const { x: currentX, y: currentY } = currentPoint;
  const { r, g, b, a } = color;
  const lineColor = `rgba(${r}, ${g}, ${b}, ${a})`;
  const lineWidth = width;

  const startPoint = prevPoint ?? currentPoint;

  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = lineColor;

  ctx.beginPath();
  ctx.moveTo(startPoint.x, startPoint.y);
  ctx.lineTo(currentX, currentY);
  ctx.stroke();
  ctx.closePath();
};
