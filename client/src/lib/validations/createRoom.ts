import * as z from 'zod';

export const createRoomSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must contain at least 3 characters' })
    .max(20, { message: 'Username must not exceed 20 characters' }),
  roomId: z
    .string()
    .trim()
    .length(21, 'Room ID must contain exactly 21 characters'),
});
