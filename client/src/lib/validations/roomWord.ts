import * as z from 'zod';

const isValidRoomWord = (word: string) => /^[A-Za-z\s]*$/.test(word);

export const roomWordSchema = z.object({
  roomWord: z
    .string()
    .min(3, { message: 'Word must contain at least 3 characters' })
    .max(12, { message: 'Word must not exceed 12 characters' })
    .refine((word) => isValidRoomWord(word), {
      message: 'Word must contain only letters and spaces',
    }),
});
