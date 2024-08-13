'use client';
import { useTheme } from 'next-themes';
import React from 'react';

interface IRightArrowProps {
  size?: string;
  color?: string;
  stroke?: number;
  className?: string;
}

const RightArrow: React.FC<IRightArrowProps> = ({
  size = 'size-6',
  color = 'currentColor',
  stroke = 1.5,
  className,
}) => {
  const { resolvedTheme } = useTheme();
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={stroke}
        stroke={resolvedTheme ? (resolvedTheme === 'light' ? color : '#fff') : "currentColor"}
        className={`group-hover:stroke-black ${size} ${className} `}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m8.25 4.5 7.5 7.5-7.5 7.5"
        />
      </svg>
    </>
  );
};
export default RightArrow;
