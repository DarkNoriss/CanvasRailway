'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type * as z from 'zod';

import { Button } from '@/components/ui/Button';
import { createRoomSchema } from '@/lib/validations/createRoom';

import { Form } from './ui/Form';

const CreateRoomForm = () => {
  const form = useForm<z.infer<typeof createRoomSchema>>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      username: '',
    },
  });

  const onSubmit = () => {};

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <h2>Form!!!</h2>
        <Button>CREATE A ROOM</Button>
      </form>
    </Form>
  );
};

export default CreateRoomForm;
