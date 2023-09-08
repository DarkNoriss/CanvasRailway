'use client';

import JoinRoomForm from './JoinRoomForm';
import { Button } from './ui/Button';
import { Dialog, DialogContent, DialogTrigger } from './ui/Dialog';

const Modal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button">JOIN A ROOM</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <JoinRoomForm />
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
