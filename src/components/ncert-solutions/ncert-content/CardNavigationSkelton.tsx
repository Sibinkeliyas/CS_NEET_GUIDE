import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const CardNavigationSkelton = () => {
  return (
    <div className="flex justify-between items-center lg:py-[10px] py-[5px]  w-full sticky bottom-0">
      <Skeleton className="bg-[#F5F5F5] text-[#101010] hover:text-[#fff] lg:py-[20px] py-[15px] lg:px-[15px] px-[15px]  shadow-none dark:bg-[#101010] dark:text-[#fff] text-[14px] h-[35px] w-[85px]" />
      <Skeleton className="bg-[#101010] text-[#fff] hover:text-[#101010] hover:bg-[#fff] lg:py-[20px] py-[15px] lg:px-[15px] px-[15px] shadow-none dark:bg-[#fff] dark:text-[#101010] text-[14px] h-[35px] w-[85px]" />
    </div>
  );
};

export default CardNavigationSkelton;
