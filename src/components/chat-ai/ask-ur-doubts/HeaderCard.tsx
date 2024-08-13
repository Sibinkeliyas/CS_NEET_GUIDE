import MainCard from "@/components/common/MainCard";
import React from "react";

const HeaderCard = ({ chapterName }: { chapterName: string }) => {
  return (
    <MainCard
      title={
        <>
          <p>Chapter</p>
          <h2 className="text-[25px] capitalize text-[#a6bcf0] font-semibold">
            {chapterName}
          </h2>
        </>
      }
      className="w-full h-[120px] py-3"
    >
      <></>
    </MainCard>
  );
};

export default HeaderCard;
