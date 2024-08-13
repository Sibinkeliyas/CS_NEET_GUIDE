import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const ChatSkeleton = () => {
  return (
    <div className="flex items-center space-x-4 w-full">
      <div className="space-y-2 w-full">
        <Skeleton className="h-4 lg:w-[60%] w-[90%]" />
        <Skeleton className="h-4 lg:w-[55%] w-[90%]" />
        <Skeleton className="h-4 lg:w-[50%] w-[80%]" />
      </div>
    </div>
  );
};

export default ChatSkeleton;
