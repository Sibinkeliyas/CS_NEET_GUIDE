import { IPrompts } from "@/types/ai";
import React from "react";

const PromptsCard = ({
  prompts,
  textareaRef,
  setInput,
}: {
  prompts: IPrompts[];
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  setInput: (input: string) => void;
}) => {
  return (
    <div className="flex justify-center items-center flex-wrap gap-2">
      {prompts.map((prompt, index) => {
        return (
          <div
            className="w-[12.5rem] h-[8.5rem] bg-[#edf1fb] dark:bg-[#1e1f20] p-4 rounded-[12px] cursor-pointer"
            key={index}
            onClick={() => {
              setInput(prompt.prompt)
              textareaRef.current?.focus()
            }}
          >
            <p className="text-[1rem] font-[400] leading-[1.375rem]">
              {prompt.prompt}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default PromptsCard;
