export type RoomCanvas = RoomId & {
  canvas: string;
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

export type GameRoomsType = RoomId & {
  gameStarted: boolean;
  roomWord: string;
  gameStage: string;
};

export type SubmitWordType = RoomId & {
  roomWord: string;
};
