import { Button } from '@/components/ui/Button';
import { socket } from '@/lib/socket';
import { useUserStore } from '@/store/userStore';

const GamePicking = () => {
  const user = useUserStore((state) => state.user);

  return (
    <div className="flex justify-center">
      {user?.isDrawing ? (
        <div>
          <span>Enter a word!</span>
          <Button onClick={() => socket.emit('check')}>CHECK ARRAY</Button>
        </div>
      ) : (
        <span>Host is picking a word...</span>
      )}
    </div>
  );
};

export default GamePicking;
