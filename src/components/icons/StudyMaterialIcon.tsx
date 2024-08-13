"use client";
import { useTheme } from "next-themes";
import React from "react";
interface IStudyMaterialIconProps {
    fill?: string;
    className?: string;
  }
const StudyMaterialIcon:React.FC<IStudyMaterialIconProps> = ({fill = "#FFFFFFCC",
    className,}) => {
  const { resolvedTheme } = useTheme();
  return (
    <>
      <svg
        width="18"
        height="20"
        viewBox="0 0 18 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M17 20H1C0.44772 20 0 19.5523 0 19V1C0 0.44772 0.44772 0 1 0H17C17.5523 0 18 0.44772 18 1V19C18 19.5523 17.5523 20 17 20ZM16 18V2H2V18H16ZM4 4H8V8H4V4ZM4 10H14V12H4V10ZM4 14H14V16H4V14ZM10 5H14V7H10V5Z"
          fill={resolvedTheme === "light" ? "#101010" : fill}
        />
      </svg>
    </>
  );
};
export default StudyMaterialIcon;
