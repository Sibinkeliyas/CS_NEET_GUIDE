import React from "react";
import { Button as ShadcnButton } from "../ui/button";
import { cn } from "@/lib/utils";

interface IButtonProps {
  text: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  className?: string;
  dataTestId: string;
  ariaLabel: string;
  disabled?: boolean;
  onClick: () => void;
}
const Button: React.FC<IButtonProps> = ({
  text,
  startIcon,
  endIcon,
  className,
  ariaLabel,
  dataTestId,
  disabled,
  onClick,
}) => {
  return (
    <>
      <ShadcnButton
        onClick={onClick}
        className={cn("gap-2", className)}
        aria-label={ariaLabel}
        data-test-id={dataTestId}
        disabled={disabled}
      >
        {startIcon}
        {text}
        {endIcon}
      </ShadcnButton>
    </>
  );
};
export default Button;
