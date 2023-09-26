import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
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
import { roomWordSchema } from '@/lib/validations/roomWord';
import type { RoomWordType } from '@/types/form';

const TypeWord = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<RoomWordType>({
    resolver: zodResolver(roomWordSchema),
    defaultValues: {
      roomWord: '',
    },
  });

  const onSubmit = (values: RoomWordType) => {
    console.log(values);
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
