import { useEffect } from 'react';

import { socket } from '@/lib/socket';
import { cn } from '@/lib/utils';
import { useMembersStore } from '@/store/membersStore';

const MemberList = () => {
  const membersStore = useMembersStore((state) => state.members);
  const setMembers = useMembersStore((state) => state.setMembers);

  useEffect(() => {
    socket.on('update-members', (members) => setMembers(members));

    return () => {
      socket.off('update-members');
    };
  }, [setMembers]);

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl">Members:</h2>
      <ol className="pl-5">
        {membersStore.map(({ id, username }, index) => (
          <li
            key={id}
            className={cn('list-disc', index === 0 ? 'text-red-400' : '')}
          >
            {username}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default MemberList;
