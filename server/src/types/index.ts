export type RoomCanvas = RoomId & {
  canvasPaths: CanvasPath;
};

export type RoomData = RoomId & {
  username: string;
};

export type RoomDraw = RoomId & {
  canvasPaths: CanvasPath;
};

export type RoomId = {
  roomId: string;
};

export type User = {
  id: string;
  username: string;
  roomId: string;
  isAdmin: boolean;
  isDrawing: boolean;
};

export type Point = {
  x: number;
  y: number;
};

type CanvasPath = {
  paths: Point[];
  strokeWidth: number;
  strokeColor: string;
  drawMode: boolean;
  startTimestamp?: number;
  endTimestamp?: number;
};
