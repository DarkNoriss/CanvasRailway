import { useEffect } from 'react';

import { ScrollArea } from '@/components/ui/ScrollArea';
import { socket } from '@/lib/socket';
import { cn } from '@/lib/utils';
import { useMembersStore } from '@/store/membersStore';
import type { User } from '@/store/userStore';
import { useUserStore } from '@/store/userStore';

const MemberList = () => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const membersStore = useMembersStore((state) => state.members);
  const setMembers = useMembersStore((state) => state.setMembers);

  useEffect(() => {
    socket.on('update-members', ({ members }) => {
      const updatedUser = members.find((u: User) => u.id === user?.id);
      setUser(updatedUser);
      setMembers(members);
    });

    return () => {
      socket.off('update-members');
    };
  }, [setMembers, setUser, user?.id]);

  return (
    <div className="flex max-w-[224px] flex-[1_1_20vw] flex-col p-4">
      <ScrollArea>
        <h2 className="pb-4 text-2xl">Members:</h2>
        <ol className="pl-5">
          {membersStore.map(({ id, username }) => (
            <li
              key={id}
              className={cn('list-disc', id === user?.id ? 'text-red-400' : '')}
            >
              {username}
            </li>
          ))}
        </ol>
      </ScrollArea>
    </div>
  );
};

export default MemberList;
