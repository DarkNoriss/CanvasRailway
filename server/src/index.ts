import express from 'express'
import http from 'http'
import { Server, Socket } from 'socket.io'
import { instrument } from '@socket.io/admin-ui'
import type { RoomData, RoomDraw, RoomId, RoomWithCanvas } from './types'
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

  addUser({ ...user, roomId })

  const members = getRoomMembers(roomId)

  socket.emit('room-joined', { user, roomId, members })
  socket.to(roomId).emit('update-members', members)
}

const leaveRoom = (socket: Socket) => {
  const user = getUser(socket.id)
  if (!user) return

  const { id, roomId, username } = user

  removeUser(id)
  const members = getRoomMembers(roomId)

  socket.to(roomId).emit('update-members', members)
  socket.leave(roomId)
}

io.on('connection', socket => {
  socket.on('create-room', ({ roomId, username }: RoomData) => {
    joinRoom(socket, roomId, username)
  })

  socket.on('join-room', ({ roomId, username }: RoomData) => {
    const members = getRoomMembers(roomId)

    if (members.length <= 0) return socket.emit('join-room-failed')

    joinRoom(socket, roomId, username)
  })

  socket.on('client-ready', ({ roomId }: RoomId) => {
    const members = getRoomMembers(roomId)

    if (members.length === 1) return socket.emit('client-loaded')

    const adminMember = members[0]

    if (!adminMember) return

    socket.to(adminMember.id).emit('get-canvas-state')
  })

  socket.on('send-canvas-state', ({ canvasState, roomId }: RoomWithCanvas) => {
    const members = getRoomMembers(roomId)
    const lastMember = members[members.length - 1]

    if (!lastMember) return

    socket.to(lastMember.id).emit('canvas-state-from-server', canvasState)
  })

  socket.on('draw', ({ drawOptions, roomId }: RoomDraw) => {
    socket.to(roomId).emit('update-canvas-state', drawOptions)
  })

  socket.on('clear-canvas', ({ roomId }: RoomId) => {
    socket.to(roomId).emit('clear-canvas')
  })

  socket.on('disconnect', () => {
    leaveRoom(socket)
  })
})

instrument(io, {
  auth: false,
})

const PORT = process.env.PORT || 3001

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} now!`)
})
