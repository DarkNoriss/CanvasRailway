import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { socket } from '@/lib/socket';
import { roomWordSchema } from '@/lib/validations/roomWord';
import { useGameStateStore } from '@/store/gameStatusStore';
import { useRoomWordStore } from '@/store/roomWordStore';
import type { RoomWordType } from '@/types/form';

const TypeWord = () => {
  const { roomId } = useParams();

  const setGameState = useGameStateStore((state) => state.setGameState);
  const setRoomWord = useRoomWordStore((state) => state.setRoomWord);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    socket.on('start-game', ({ roomWord }) => {
      setRoomWord(roomWord);
      setGameState('GAME_PLAYING');
    });

    return () => {
      socket.off('start-game');
    };
  }, [setGameState, setRoomWord]);

  const form = useForm<RoomWordType>({
    resolver: zodResolver(roomWordSchema),
    defaultValues: {
      roomWord: '',
    },
  });

  const onSubmit = ({ roomWord }: RoomWordType) => {
    setIsSubmitting(true);
    socket.emit('submit-word', { roomId, roomWord });
  };

  return (
    <Card className="w-[90vw] max-w-sm">
      <CardHeader>
        <CardTitle>Enter a word!</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="roomWord"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter your word" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting} className="mt-2">
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'CONFIRM'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default TypeWord;
