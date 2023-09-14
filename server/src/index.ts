import express from 'express'
import http from 'http'
import { Server, Socket } from 'socket.io'
import { instrument } from '@socket.io/admin-ui'
import type
{ DrawLine, RoomData } from './types'
import { addUser, getRoomMembers, getUser, removeUser } from './data/users'

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

const checkRoom = (socket: Socket, roomId: string, username: string) => {
  const members = getRoomMembers(roomId)

  if (members.length <= 0) return socket.emit('join-room-failed')
  
  joinRoom(socket, roomId, username)
}

const leaveRoom = (socket: Socket) => {
  const user = getUser(socket.id)
  if (!user) return

  const { id, roomId, username } = user

  removeUser(id)
  const members = getRoomMembers(roomId)

  socket.to(roomId).emit('update-members', members)
  socket.to(roomId).emit('send-notification', {
    title: "Member departure!",
    message: `${username} left the room.`
  })
  socket.leave(roomId)
}

io.on('connection', socket => {
  socket.on('create-room', ({ roomId, username }: RoomData ) => {
    joinRoom(socket, roomId, username)
  })

  socket.on('join-room', ({ roomId, username }: RoomData) => {
    checkRoom(socket, roomId, username)
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
    leaveRoom(socket)
  })
})

instrument(io, {
  auth: false
})

const PORT = process.env.PORT || 3001

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} now!`)
})
