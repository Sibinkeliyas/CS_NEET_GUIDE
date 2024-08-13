import { PRICING_TITLES } from '@/types/enums';
import React from 'react';

const PricingTopContent = () => {
  return (
    <div className="max-w-[486px] m-auto text-center llg:mb-[50px] mb-[29px]">
      <h3 className="text-[#101010] dark:text-[#fff] font-semibold lg:text-[58px] text-[33px] lg:mb-[20px] mb-[12px]">
        {PRICING_TITLES.PRICING_PLANS}
      </h3>
      <p className="text-[#585858] dark:text-[#fff] lg:text-[20px] text-[16px] font-light  text-center">
        {PRICING_TITLES.PRICING_CONTENT}
      </p>
    </div>
  );
};

export default PricingTopContent;
