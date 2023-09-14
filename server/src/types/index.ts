import type { IColor } from "react-color-palette";

export type RoomData = {
  roomId: string;
  username: string
}

export type User = {
  id: string;
  username: string;
  roomId: string;
}

export type DrawLine = {
  prevPoint: Point | null
  currentPoint: Point
  color: IColor;
  width: number
}

export type Point = {
  x: number;
  y: number
}