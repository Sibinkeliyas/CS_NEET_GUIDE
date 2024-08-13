import { cn } from "@/lib/utils";
import { useSelector } from "@/store";
import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Content from "./Content";
import { IChatAiProps, IPrompts } from "@/types/ai";
import { ImageFileProps } from ".";
import { AI } from "@/types/enums";
import PromptsCard from "./PromptsCard";

interface IScrollViewPrompts {
  messages: IChatAiProps[];
  loading: boolean;
  prompts?: IPrompts[];
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  input: string;
  handleSend: (prompt?: string) => void;
  setInput: (input: string) => void;
}

const ScrollView = ({
  loading,
  messages,
  prompts,
  input,
  textareaRef,
  setInput,
}: IScrollViewPrompts) => {
  const { openDrawer } = useSelector((state) => state.menuReducer);
  return (
    <div
      tabIndex={0}
      className={cn(
        "w-full mx-auto rounded-lg lg:pb-[45px] overflow-hidden !h-[67dvh] !pb-0 transition-[200ms]",
        textareaRef.current?.scrollHeight &&
          input &&
          textareaRef.current?.scrollHeight > 90
          ? `!h-[58dvh]`
          : "!h-[67dvh]"
      )}
    >
      <ScrollToBottom
        aria-label="Scrollable message area"
        className={cn(
          "block lg:pe-2 pe-1 scrollbar-thin h-full overflow-hidden Custom_ScrollToBottom "
        )}
        scrollViewClassName={cn(
          "scrollbar-thin pe-2 overflow-y-auto h-full lg:!px-[20%] sm:!px-[20px] !px-[10px] scroll-view",
          !openDrawer && "lg:!px-[30%] sm:!px-[25px] !px-[15px]"
        )}
        followButtonClassName="mb-8"
      >
        {messages.length ? (
          <Content loading={loading} messages={messages} />
        ) : (
          <>
            <div className="flex justify-center items-center h-full flex-col">
              <h3 className="font-semibold text-center m-auto !text-[#101010] dark:!text-[#fff]">
                {AI.START_UR_CHAT}
              </h3>
              {prompts && prompts.length > 0 && (
                <div className="mt-auto">
                  <PromptsCard
                    prompts={prompts}
                    setInput={setInput}
                    textareaRef={textareaRef}
                  />
                </div>
              )}
            </div>
          </>
        )}
      </ScrollToBottom>
    </div>
  );
};

export default ScrollView;
