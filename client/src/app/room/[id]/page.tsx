'use client';

import 'react-color-palette/css';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import GameRoom from '@/components/GameRoom';
import { useUserStore } from '@/store/userStore';

const Page = () => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (!user) router.replace('/');
  }, [router, user]);

  if (user) return <GameRoom />;
  return null;
};

export default Page;
