import LeftArrow from "@/components/icons/LeftArrow";
import { SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ISubjectDetailsProps } from "@/types";
import React from "react";

const Header: React.FC<{ subjectDetail: ISubjectDetailsProps | null }> = ({
  subjectDetail,
}) => {

  return (
    <div className="px-[24px] py-[22px] md:px-[20px] md:py-[16px] lg:px-[20px] lg:py-[16px] border-b-[1px] flex gap-2 items-center">
      <SheetTrigger className="border-0">
        <LeftArrow
          size="size-6"
          stroke={2.5}
          color="#101010"
          data-test-id="chapter-detail-card-back-arrow"
          aria-label="Back Arrow"
        />
      </SheetTrigger>
      <SheetTitle>
        <h3
          className="font-normal md:text-xl lg:text-xl text-[#101010] dark:text-[#FFFFFF]"
          data-test-id="chapter-detail-card-title"
        >
          {subjectDetail?.name}
        </h3>
      </SheetTitle>
    </div>
  );
};

export default Header;
