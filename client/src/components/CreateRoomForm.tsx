import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import CopyButton from '@/components/CopyButton';
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
import { socket } from '@/lib/socket';
import { createRoomSchema } from '@/lib/validations/roomForm';
import { useMembersStore } from '@/store/membersStore';
import { useUserStore } from '@/store/userStore';
import type { CreateRoomType } from '@/types/form';

const CreateRoomForm = () => {
  const router = useRouter();

  const setUser = useUserStore((state) => state.setUser);
  const setMembers = useMembersStore((state) => state.setMembers);

  const [genRoomId, setGenRoomId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<CreateRoomType>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      username: '',
    },
  });

  useEffect(() => {
    if (!genRoomId) setGenRoomId(nanoid());

    socket.on('room-joined', ({ user, roomId, members }) => {
      setUser(user);
      setMembers(members);
      router.replace(`./room/${roomId}`);
    });

    return () => {
      socket.off('room-joined');
    };
  }, [genRoomId, router, setMembers, setUser]);

  const onSubmit = (values: CreateRoomType) => {
    const roomId = genRoomId;
    const { username } = values;

    socket.emit('create-room', { roomId, username });
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
                  {genRoomId && (
                    <>
                      <span>{genRoomId}</span>
                      <CopyButton value={genRoomId} />
                    </>
                  )}
                </div>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="mt-2">
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
