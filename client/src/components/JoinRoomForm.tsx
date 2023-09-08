'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/Button';
import { createRoomSchema } from '@/lib/validations/createRoom';
import type { RoomType } from '@/types/form';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/Form';
import { Input } from './ui/Input';

const JoinRoomForm = () => {
  const form = useForm<RoomType>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      username: '',
      roomId: '',
    },
  });

  const onSubmit = (values: RoomType) => {
    return values;
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
        <Button type="submit">JOIN A ROOM</Button>
      </form>
    </Form>
  );
};

export default JoinRoomForm;
