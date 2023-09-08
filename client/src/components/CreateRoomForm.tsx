'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/Button';
import { socket } from '@/lib/socket';
import { createRoomSchema } from '@/lib/validations/createRoom';
import type { RoomType } from '@/types/form';

import CopyButton from './CopyButton';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/Form';
import { Input } from './ui/Input';

type CreateRoomFormProps = { roomId: string };

const CreateRoomForm = ({ roomId }: CreateRoomFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RoomType>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      username: '',
      roomId,
    },
  });

  const onSubmit = (values: RoomType) => {
    socket.emit('create-room', values);
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
                <Input placeholder="Enter your username" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="roomId"
          render={() => (
            <FormItem>
              <FormLabel className="text-foreground">Room ID</FormLabel>
              <FormControl>
                <div className="flex h-10 w-full items-center justify-between rounded-md border bg-background px-3 py-2 text-sm text-muted-foreground">
                  <span>{roomId}</span>
                  <CopyButton value={roomId} />
                </div>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            'CREATE A ROOM'
          )}
        </Button>
      </form>
    </Form>
  );
};

export default CreateRoomForm;
