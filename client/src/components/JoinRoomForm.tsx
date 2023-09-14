import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/hooks/useToast';
import { socket } from '@/lib/socket';
import { createRoomSchema } from '@/lib/validations/createRoom';
import type { RoomType } from '@/types/form';

const JoinRoomForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const form = useForm<RoomType>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      username: '',
      roomId: '',
    },
  });

  useEffect(() => {
    socket.on('join-room-failed', () => {
      setIsLoading(false);
      toast({
        title: 'Join room failed!',
        description:
          'The room ID you entered is incorrect. Please check and try again.',
        variant: 'destructive',
      });
    });

    return () => {
      socket.off('join-room-failed');
    };
  }, [toast]);

  const onSubmit = (values: RoomType) => {
    socket.emit('join-room', values);
    setIsLoading(true);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your username"
                  className="text-black"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="roomId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">Room ID</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter room ID"
                  className="text-black"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="mt-2">
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            'JOIN A ROOM'
          )}
        </Button>
      </form>
    </Form>
  );
};

export default JoinRoomForm;
