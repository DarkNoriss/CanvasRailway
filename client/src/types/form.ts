import type { z } from 'zod';

import type {
  createRoomSchema,
  joinRoomSchema,
} from '@/lib/validations/roomForm';
import type { roomWordSchema } from '@/lib/validations/roomWord';

export type CreateRoomType = z.infer<typeof createRoomSchema>;

export type JoinRoomType = z.infer<typeof joinRoomSchema>;

export type RoomWordType = z.infer<typeof roomWordSchema>;
