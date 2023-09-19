import type { z } from 'zod';

import type { createRoomSchema } from '@/lib/validations/roomForm';

export type RoomType = z.infer<typeof createRoomSchema>;
