import { addUser, getRoomMembers } from '@/data/users'
import { Socket } from 'socket.io'

export const joinRoom = (socket: Socket, roomId: string, username: string) => {
  socket.join(roomId)

  const user = {
    id: socket.id,
    username,
    isAdmin: false,
    isDrawing: false,
  }

  addUser({ ...user, roomId })

  const members = getRoomMembers(roomId)

  socket.emit('room-joined', { user, roomId, members })
  socket.to(roomId).emit('update-members', { members })
}
