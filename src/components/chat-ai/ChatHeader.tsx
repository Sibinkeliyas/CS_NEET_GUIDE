import { CHAT } from "@/types/enums";
import React from "react";
import Button from "../common/Button";
import { useParams, useRouter } from "next/navigation";
import { IChatAiProps } from "@/types/ai";
import { putRestChats } from "@/utils/api/ai-doubt-module";
import { ChevronLeftIcon, ReloadIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

const ChatHeader = ({
  topicName,
  disableReset,
  setMessages,
}: {
  topicName?: string;
  disableReset: boolean;
  setMessages: (messages: IChatAiProps[]) => void;
}) => {
  const params: any = useParams();
  const router = useRouter();
  const { subjectUrl, chapterUrl, topicUrl } = params;
  const chapterUrlParts = chapterUrl?.split("-");
  const chapterSlug = chapterUrlParts?.slice(2)?.join("-");

  const handleResetChat = async () => {
    if (disableReset) return;
    setMessages([]);
    await putRestChats(subjectUrl, chapterSlug, topicUrl);
  };

  return (
    <div className="border-b border[rgba(16,_16,_16,_0.5)] sticky top-[0] left-[0] pb-[12px] lg:pb-[15px] flex w-full">
      <h1 className="text-[16px] font-medium text-[#101010] dark:text-[#fff] leading-[24px]">
        {topicName ? (
          <>
            {CHAT.ASK_DOUBTS_FROM}{" "}
            <span className="capitalize">{topicName}</span>
          </>
        ) : (
          CHAT.ASK_QUES
        )}
      </h1>
      <div className="flex justify-center gap-1 ml-auto items-center">
        <div
          className={cn(
            "mr-3 rounded-[50%]",
            !disableReset && "cursor-pointer"
          )}
          onClick={handleResetChat}
        >
          <ReloadIcon />
        </div>
        <Button
          className=""
          text="Back"
          onClick={() => router.back()}
          ariaLabel="Reset the chat"
          dataTestId="reset-chat"
          startIcon={<ChevronLeftIcon />}
        />
      </div>
    </div>
  );
};

export default ChatHeader;
