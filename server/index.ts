import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: '*',
  },
})

type RGBColor = {
  a?: number | undefined
  b: number
  g: number
  r: number
}

type DrawLine = {
  prevPoint: Point | null
  currentPoint: Point
  color: RGBColor
  width: number
}

type Point = { x: number; y: number }

io.on('connection', socket => {
  console.log('connection')

  socket.on('client-ready', () => {
    socket.broadcast.emit('get-canvas-state')
  })

  socket.on('canvas-state', (state: string) => {
    socket.broadcast.emit('canvas-state-from-server', state)
  })

  socket.on('draw-line', ({ prevPoint, currentPoint, color, width }: DrawLine) => {
    socket.broadcast.emit('draw-line', {
      prevPoint,
      currentPoint,
      color,
      width,
    })
  })

  socket.on('clear', () => io.emit('clear'))
})

server.listen(3001, () => {
  console.log('listening on port 3001')
})
