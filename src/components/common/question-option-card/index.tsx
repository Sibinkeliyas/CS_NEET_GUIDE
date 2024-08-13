import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type CardProps = React.ComponentProps<typeof Card>;

interface IOptionCardProps {
  option: string;
  answer: string;
  bgColor: string;
  className?: string;
  dataTestId:string;
  ariaLabel:string;
}

const OptionCard: React.FC<IOptionCardProps & CardProps> = ({
  answer,
  option,
  bgColor,
  className,
  ariaLabel,
  dataTestId,
  ...props
}) => {

  return (
    <>
      <Card
        className={cn("!rounded flex items-center gap-3", className)}
        {...props}
        aria-label={ariaLabel}
        data-test-id={dataTestId}
      >
        <div
          className="col-span-1 border-r px-[9px] py-[12px] lg:px-[15px] lg:py-[12px] flex justify-center items-center !rounded-s"
          style={{ backgroundColor: bgColor }}
        >
          <p className="font-medium text-sm text-[#101010]">{option}</p>
        </div>
        <p className="font-normal text-xs lg:text-sm text-inherit">{answer}</p>
      </Card>
    </>
  );
};

export default OptionCard;
