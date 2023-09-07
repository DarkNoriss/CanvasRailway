import type { z } from 'zod';

import type { createRoomSchema } from '@/lib/validations/createRoom';

export type RoomType = z.infer<typeof createRoomSchema>;
