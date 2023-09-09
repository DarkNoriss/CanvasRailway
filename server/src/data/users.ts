import type { User } from "@/types";

const userList: User[] = [];

const getUser = (userId: string) => userList.find(user => user.id === userId)

const addUser = (user: User) => userList.push(user)

const removeUser = (userId: string) => userList.filter(user => user.id === userId)

const getRoomMembers = (roomId: string) => userList.filter(member => member.roomId === roomId).map(({ id, username }) => ({ id, username }))

export { getUser, addUser, removeUser, getRoomMembers }