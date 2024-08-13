import RightArrow from "@/components/icons/RightArrow";
import { Card } from "@/components/ui/card";
import React from "react";

interface IContentCardProps {
  name: string;
  logo: React.ReactNode;
}
const ContentCard: React.FC<IContentCardProps> = ({ logo, name }) => {
  const clonedLogo = React.cloneElement(logo as React.ReactElement, {
    className: "fill-[#FFFFFF] dark:group-hover:fill-[#101010]",
    fill: "dark:group-hover:fill-[#101010]",
  });
  return (
    <>
      <Card
        className="px-[24px] py-[22px] bg-[#F5F5F580] border-0 grid grid-cols-12 rounded-[10px] hover:bg-[#D1DDF733] dark:bg-[#000000] dark:hover:bg-[#D1DDF7] group cursor-pointer shadow-sm"
        aria-label={`${name}`}
        data-test-id={`${name}-card`}
      >
        <div className="flex items-center gap-3 col-span-11">
          <div className="w-[26px]">{clonedLogo}</div>
          <h3 className="font-normal md:text-lg lg:text-lg !text-[#101010] dark:!text-[#FFFFFF] text-base cursor-pointer hover:!text-[#192B69] dark:group-hover:!text-[#101010]">
            {name}
          </h3>
        </div>
        <div
          className="col-span-1 flex items-center justify-end"
          data-test-id={`${name}-card-arrow`}
        >
          <RightArrow
            size="size-5"
            stroke={2.5}
            color="#101010"
            className="stroke-[#101010]"
          />
        </div>
      </Card>
    </>
  );
};
export default ContentCard;
