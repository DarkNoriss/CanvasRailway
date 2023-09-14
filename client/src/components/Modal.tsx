import JoinRoomForm from '@/components/JoinRoomForm';
import { Button } from '@/components/ui/Button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/Dialog';

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
