import React from "react";

import MainCard from "@/components/common/MainCard";
import ChatHeader from "./ChatHeader";
import ChatSkeleton from "./ChatSkeleton";
import { cn } from "@/lib/utils";

const ChatAiSkelton = () => {
  return (
    <MainCard
      data-test-id="doubt-module-maincard"
      title={<ChatHeader disableReset={false} setMessages={() => {}}/>}
      className="my-4 relative"
      cardAction={<></>}
    >
      <>
        <div className="w-full mx-auto mt-10 rounded-lg ">
          <div
            className={cn(
              "block  overflow-y-auto scrollbar-thin lg:pe-2 pe-1 transition-all",
              "h-[200px]"
            )}
          >
            <ChatSkeleton />
          </div>
        </div>
      </>
    </MainCard>
  );
};

export default ChatAiSkelton;
