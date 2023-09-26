import TypeWord from '@/components/TypeWord';
import { useUserStore } from '@/store/userStore';

const GamePicking = () => {
  const user = useUserStore((state) => state.user);

  return (
    <div className="flex justify-center">
      {user?.isDrawing ? (
        <div className="flex flex-col justify-center">
          <TypeWord />
        </div>
      ) : (
        <span>Player is entering a word...</span>
      )}
    </div>
  );
};

export default GamePicking;
