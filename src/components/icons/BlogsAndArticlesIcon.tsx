"use client";
import { useTheme } from "next-themes";
import React from "react";

interface IBlogsAndArticlesIconProps {
    fill?: string;
    className?: string;
  }
const BlogsAndArticlesIcon:React.FC<IBlogsAndArticlesIconProps> = ({fill = "#FFFFFFCC",
    className,}) => {
  const { resolvedTheme } = useTheme();
  return (
    <>
      <svg
        width="20"
        height="18"
        viewBox="0 0 20 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M0 1C0 0.44772 0.44772 0 1 0H19C19.5523 0 20 0.44772 20 1V17C20 17.5523 19.5523 18 19 18H1C0.44772 18 0 17.5523 0 17V1ZM2 2V16H18V2H2ZM4 4H10V10H4V4ZM6 6V8H8V6H6ZM12 6H16V4H12V6ZM16 10H12V8H16V10ZM4 12V14H16V12H4Z"
          fill={resolvedTheme === "light" ? "#101010" : fill}
        />
      </svg>
    </>
  );
};
export default BlogsAndArticlesIcon;
