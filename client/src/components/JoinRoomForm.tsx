import { zodResolver } from '@hookform/resolvers/zod';
import { Form, useForm } from 'react-hook-form';

import { createRoomSchema } from '@/lib/validations/createRoom';
import type { RoomType } from '@/types/form';

import CopyButton from './CopyButton';
import { Button } from './ui/Button';
import { FormControl, FormField, FormItem, FormLabel } from './ui/Form';
import { Input } from './ui/Input';

type JoinRoomFormProps = { roomId: string };

const JoinRoomForm = ({ roomId }: JoinRoomFormProps) => {
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
                <div className="flex h-10 w-full items-center justify-between rounded-md border bg-background px-3 py-2 text-sm text-muted-foreground">
                  <span>{roomId}</span>
                  <CopyButton value={roomId} />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">CREATE A ROOM</Button>
      </form>
    </Form>
  );
};

export default JoinRoomForm;
