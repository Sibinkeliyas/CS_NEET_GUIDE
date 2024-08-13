import Button from '@/components/common/Button';
import { CHAT } from '@/types/enums';
import React from 'react';

const ContentOverlay = () => {
  return (
    <div className="flex  items-center z-10 justify-center absolute left-0 top-0 bg-[#ffffff4d] w-full h-full backdrop-filter backdrop-blur-[2px] dark:bg-[#00000071]">
      <div className="text-center"></div>
    </div>
  );
};

export default ContentOverlay;
