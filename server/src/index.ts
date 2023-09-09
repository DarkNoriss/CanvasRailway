import express from 'express'
import http from 'http'
import { Server, Socket } from 'socket.io'
import type
{ DrawLine, RoomData } from './types'
import { addUser, getRoomMembers } from './data/users'

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: '*',
  },
})

const joinRoom = (socket: Socket, roomId: string, username: string) => {
  socket.join(roomId)

  const user = {
    id: socket.id,
    username,
  }

  addUser({...user, roomId})

  const members = getRoomMembers(roomId)

  socket.emit('room-joined', { user, roomId, members })
  socket.to(roomId).emit('update-members', members)
  socket.to(roomId).emit('send-notification', {
    title: "New member arrived!",
    message: `${username} joined the room.`
  })
}

const leaveRoom = (socket: Socket) => {
  console.log("disconnected")
  
}

io.on('connection', socket => {
  console.log('connected', socket.id)

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

  socket.on('clear', () => socket.emit('clear'))

  socket.on('disconnect', () => {
    socket.emit('disconnected')
    leaveRoom(socket)
  })
})

const PORT = process.env.PORT || 3001

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} now!`)
})
