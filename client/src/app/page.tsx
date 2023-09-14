'use client';

import CreateRoomForm from '@/components/CreateRoomForm';
import Modal from '@/components/Modal';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Separator } from '@/components/ui/Separator';

const Page = () => {
  return (
    <Card className="w-[90vw] max-w-sm">
      <CardHeader>
        <CardTitle>Meowvas</CardTitle>
        <CardDescription>Draw with ur frens! Yipeeeeeeeeeeeee!</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4">
        <CreateRoomForm />
        <div className="  flex items-center space-x-2">
          <Separator decorative />
          <span className="text-xs text-muted-foreground">OR</span>
          <Separator decorative />
        </div>
        <Modal />
      </CardContent>
    </Card>
  );
};

export default Page;
