export type RoomData = {
  roomId: string;
  username: string
}
export type RGBColor = {
  a?: number | undefined
  b: number
  g: number
  r: number
}

export type DrawLine = {
  prevPoint: Point | null
  currentPoint: Point
  color: RGBColor
  width: number
}

export type Point = {
  x: number;
  y: number
}