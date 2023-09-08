import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import { DrawLine, RoomData } from './types'

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: '*',
  },
})

io.on('connection', socket => {
  console.log('connection')

  socket.on('create-room', ({roomId, username}: RoomData) => {
    console.log(roomId)
  })

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

const PORT = process.env.PORT || 3001

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} now!`)
})
