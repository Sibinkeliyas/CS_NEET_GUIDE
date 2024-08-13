'use client'
import { useTheme } from "next-themes";
import React from "react";

const StudyMaterials = () => {
  const {resolvedTheme}=useTheme()
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.6667 12.8332H2.33333C2.01117 12.8332 1.75 12.572 1.75 12.2498V1.74984C1.75 1.42767 2.01117 1.1665 2.33333 1.1665H11.6667C11.9888 1.1665 12.25 1.42767 12.25 1.74984V12.2498C12.25 12.572 11.9888 12.8332 11.6667 12.8332ZM11.0833 11.6665V2.33317H2.91667V11.6665H11.0833ZM4.08333 3.49984H6.41667V5.83317H4.08333V3.49984ZM4.08333 6.99984H9.91667V8.1665H4.08333V6.99984ZM4.08333 9.33317H9.91667V10.4998H4.08333V9.33317ZM7.58333 4.08317H9.91667V5.24984H7.58333V4.08317Z"
        fill={resolvedTheme == 'light'?  "#000000" : "#ffffff"}

        fillOpacity="0.7"
      />
    </svg>
  );
};

export default StudyMaterials;
