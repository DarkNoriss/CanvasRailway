import type { IColor } from 'react-color-palette';

type Draw = {
  ctx: CanvasRenderingContext2D;
  currentPoint: Point;
  prevPoint: Point | null;
};

type Point = {
  x: number;
  y: number;
};

type DrawLine = Draw & {
  color: IColor;
  width: number;
};
