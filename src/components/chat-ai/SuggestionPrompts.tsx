import React from 'react'
import SendSuggestion from '../icons/SendSuggestion'
import { IPrompts } from '@/types/ai'

interface ISuggestionProps {
  data?: IPrompts[]
  setSuggestion: (prompt: string) => void
}

const SuggestionPrompts: React.FC<ISuggestionProps> = ({
  data,
  setSuggestion,
}) => {
  return (
    <div className="bg-white dark:bg-[#171717] p-4 rounded-lg  max-w-[90%] m-auto border border-[#e5e7eb] dark:border-[#58585800] transition-[height]">
      <ul className="[list-style:none] p-[0] max-h-[220px] overflow-y-auto scrollbar-thin">
        {data?.map((prompt: IPrompts, index: number) => (
          <p
            key={index}
            className="flex justify-between items-center py-2 px-3 border-b border-gray-200 dark:border-[#e5e7eb1d] last:border-none cursor-pointer hover:bg-gray-100 dark:hover:bg-[#262626] text-[13px] font-light "
            onClick={(e) => setSuggestion(prompt.prompt)}
          >
            <span className="text-black dark:text-white">{prompt.prompt}</span>
            <SendSuggestion />
          </p>
        ))}
      </ul>
    </div>
  );
};

export default SuggestionPrompts;
