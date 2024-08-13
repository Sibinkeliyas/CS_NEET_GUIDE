import { IPrompts } from '@/types/ai';
import React from 'react';
import CircleArrow from '../icons/CircleArrow';
import { cn } from '@/lib/utils';

const Prompts = ({
  prompts,
  isImageSelected,
  handleSend,
}: {
  prompts: IPrompts[];
  isImageSelected?: boolean;
  handleSend: (prompt?: string) => void;
}) => {
  return (
    <div
      className={cn(
        'flex justify-center items-center bottom-2 flex-col xl:flex-row absolute w-full transition-all z-10',
        isImageSelected && '!bottom-28'
      )}
    >
      {prompts.map((prompt, index) => {
        return (
          <div
            className={cn(
              'border px-3 py-2 rounded-md flex  justify-between items-center cursor-pointer h-full mx-3 my-1 w-full md:max-w-[70%] '
            )}
            key={index}
            onClick={() => handleSend(prompt.prompt)}
            data-test-id={`${prompt.prompt}-button`}
          >
            <p className="text-[12px] lg:text-[14px] #101010">
              {prompt.prompt}
            </p>
            <div className="ml-3">
              <CircleArrow color="currentColor" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Prompts;
