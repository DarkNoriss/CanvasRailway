'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type * as z from 'zod';

import { Button } from '@/components/ui/Button';
import { createRoomSchema } from '@/lib/validations/createRoom';

const CreateRoomForm = () => {
  const form = useForm<z.infer<typeof createRoomSchema>>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      username: '',
    },
  });

  return (
    <form className="flex flex-col gap-4">
      <h2>Form!!!</h2>
      <Button>CREATE A ROOM</Button>
    </form>
  );
};

export default CreateRoomForm;
