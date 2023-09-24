import { useInterval } from '@mantine/hooks';
import { useEffect, useState } from 'react';

import { useGameStateStore } from '@/store/gameStatusStore';

const Countdown = () => {
  const [seconds, setSeconds] = useState(5);
  const interval = useInterval(() => setSeconds((s) => s - 1), 1000);

  const setGameState = useGameStateStore((state) => state.setGameState);

  useEffect(() => {
    if (seconds > 0) interval.start();
    if (seconds <= 0) {
      interval.stop();
      setGameState('GAME_ROOM');
    }

    return interval.stop;
  }, [interval, seconds, setGameState]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800/80">
      <span className="text-8xl">{seconds}</span>
    </div>
  );
};

export default Countdown;
