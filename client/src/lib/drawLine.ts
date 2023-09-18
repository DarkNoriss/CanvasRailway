import type { IColor } from 'react-color-palette';

import type { Draw } from '@/types/typing';

export type DrawOptions = Draw & {
  color: IColor;
  width: number;
};

export const drawLine = ({
  ctx,
  currentPoint,
  prevPoint,
  color,
  width,
}: DrawOptions) => {
  const { x: currentX, y: currentY } = currentPoint;
  const { rgb } = color;
  const { r, g, b, a } = rgb;

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
