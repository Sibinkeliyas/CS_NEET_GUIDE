"use client";
import { useTheme } from "next-themes";
import React from "react";

interface INcertBookIconProps {
  fill?: string;
  className?: string;
}

const NcertBookIcon: React.FC<INcertBookIconProps> = ({
  fill = "#FFFFFFCC",
  className,
}) => {
  const { resolvedTheme } = useTheme();
  return (
    <svg
      width="18"
      height="20"
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M18 2H4C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6H18V19C18 19.5523 17.5523 20 17 20H4C1.79086 20 0 18.2091 0 16V4C0 1.79086 1.79086 0 4 0H17C17.5523 0 18 0.44772 18 1V2ZM2 16C2 17.1046 2.89543 18 4 18H16V8H4C3.27143 8 2.58835 7.80521 2 7.46487V16ZM17 5H4C3.44772 5 3 4.55228 3 4C3 3.44772 3 3 4 3H17V5Z"
        fill={resolvedTheme === "light" ? "#101010" : fill}
      />
    </svg>
  );
};

export default NcertBookIcon;
