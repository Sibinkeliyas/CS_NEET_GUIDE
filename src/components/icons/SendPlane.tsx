import React from 'react';
import { useTheme } from 'next-themes';
const SendPlane = () => {
  const { resolvedTheme } = useTheme();
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 lg:w-[24px] w-[18px] lg:h-[24px] h-[18px]"
        viewBox="0 0 18 18"
        fill="currentColor"
      >
        <path
          d="M1.45961 6.98679C1.06771 6.85615 1.06461 6.64538 1.46768 6.51103L15.7823 1.73947C16.1787 1.60735 16.406 1.82921 16.2949 2.21792L12.205 16.5326C12.0918 16.9289 11.8633 16.9427 11.6959 16.5659L8.99999 10.5002L13.5 4.50025L7.5 9.00022L1.45961 6.98679Z"
          fill={resolvedTheme == 'light' ? '!#FFFFFF' : `!#021863`}
        />
      </svg>
    </>
  );
};

export default SendPlane;
