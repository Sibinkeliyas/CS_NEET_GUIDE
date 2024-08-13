import { PRICING_TITLES } from '@/types/enums';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const PaymetFailed = () => {
  return (
    <div className="w-max-[1000px]  m-auto h-screen flex items-center justify-center">
      <div className="p-4 mb-3 mx-auto max-w-[600px] w-[90%]  bg-[#ffff] dark:bg-[#000] rounded-[4px] border-[1px] border-[solid] border-[#e5e7eb] dark:border-[#e5e7eb4d]">
        <Image
          src="/images/payfailed.png"
          className="m-auto block  object-contain lg:mt-[-173px] mt-[-80px]  mb-2 lg:w-[280px] w-[200px] !h-[auto]"
          alt=""
          width={300}
          height={300}
        />

        <h3 className="text-center pt-[15px] mt-[-10px] mx-auto w-[90%] mb-[20px] lg:text-[40px] text-[22px] text-[#101010] dark:text-[#fff] font-semibold border-t-[1px]  dark:border-[#e5e7eb4d] border-[#e5e7eb] ">
          {PRICING_TITLES.PAYMENT_FAILED}
        </h3>
        <Link
          href={'/'}
          className="block m-auto w-[90%] lg:rounded-[15px] rounded-[10px] text-[#101010] dark:text-[#fff] text-center lg:p-[15px] p-[12px] border-[1px]  dark:!border-[#e5e7eb4f] border-[#000000af] dark:bg-[#dddddd14]"
        >
          {PRICING_TITLES.BACK_HOME}
        </Link>
      </div>
    </div>
  );
};

export default PaymetFailed;
