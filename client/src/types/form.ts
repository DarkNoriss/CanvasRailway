import type { z } from 'zod';

import type { createRoomSchema } from '@/lib/validations/roomForm';
import type { roomWordSchema } from '@/lib/validations/roomWord';

export type RoomType = z.infer<typeof createRoomSchema>;

export type RoomWordType = z.infer<typeof roomWordSchema>;
