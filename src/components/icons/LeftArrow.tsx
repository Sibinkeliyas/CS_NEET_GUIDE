'use client';
import { useTheme } from 'next-themes';
import React from 'react';

interface ILeftArrowProps {
  size?: string;
  color?: string;
  stroke?: number;
}
const LeftArrow: React.FC<ILeftArrowProps> = ({
  size = 'size-6',
  color = 'currentColor',
  stroke = 1.5,
}) => {
  const { resolvedTheme } = useTheme();
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={stroke}
        stroke={resolvedTheme == 'light' ? color : '#FFFFFF'}
        className={size}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5 8.25 12l7.5-7.5"
        />
      </svg>
    </>
  );
};
export default LeftArrow;
