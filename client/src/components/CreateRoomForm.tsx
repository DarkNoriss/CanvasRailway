'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type * as z from 'zod';

import { Button } from '@/components/ui/Button';
import { createRoomSchema } from '@/lib/validations/createRoom';

import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/Form';
import { Input } from './ui/Input';

type RoomType = z.infer<typeof createRoomSchema>;

const CreateRoomForm = ({ roomId }: { roomId: string }) => {
  const form = useForm<RoomType>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      username: '',
      roomId,
    },
  });

  const onSubmit = (values: RoomType) => {
    console.log(values);
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
                <Input value={roomId} readOnly />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">CREATE A ROOM</Button>
      </form>
    </Form>
  );
};

export default CreateRoomForm;
