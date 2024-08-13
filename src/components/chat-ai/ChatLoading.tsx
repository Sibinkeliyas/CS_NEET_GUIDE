import { cn } from "@/lib/utils";
import React from "react";
import { Skeleton } from "../ui/skeleton";

const ChatLoading = () => {
  return (
    <div className="w-full mx-auto mt-10 rounded-lg mb-5">
      <div
        className={cn(
          "block  overflow-y-auto scrollbar-thin lg:pe-2 pe-1 transition-all",
          "h-[340px]"
        )}
      >
        <div>
          <div className={`mb-[15px] flex justify-end items-end flex-col`}>
            <Skeleton className="w-[30%] h-10   " />
          </div>
          <div className={`mb-[15px] flex ${"justify-start"} flex-col`}>
            <Skeleton className="w-[60%] h-10  animate-pulse " />
          </div>
        </div>
        <div>
          <div className={`mb-[15px] flex justify-end items-end flex-col`}>
            <Skeleton className="w-[30%] h-10   " />
          </div>
          <div className={`mb-[15px] flex ${"justify-start"} flex-col`}>
            <Skeleton className="w-[60%] h-10  animate-pulse " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatLoading;
