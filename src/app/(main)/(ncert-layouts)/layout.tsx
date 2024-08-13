import React from 'react';
import dynamic from 'next/dynamic';
import MobileProgressSkeleton from '@/components/ncert-solutions/progress-card/MobileProgressSkeleton';
import ProgressCardSkeleton from '@/components/ncert-solutions/progress-card/ProgressSkeleton';
const ProgressCard = dynamic(
  () => import('@/components/ncert-solutions/progress-card'),
  { loading: () => <ProgressCardSkeleton /> }
);
const MobileProgressCard = dynamic(
  () => import('@/components/ncert-solutions/progress-card/MobileProgress'),
  { loading: () => <MobileProgressSkeleton /> }
);

const NcertLayout = ({ children }: { children: React.ReactElement }) => {
  return (
    <>
      {/* <div className="mb-[20px] max-2xl:block hidden -translate-y-[7px] sticky top-0 z-[20] ">
        <MobileProgressCard />
      </div> */}
      <div className="px-4 h-[100%] ">
        <div className="lg:grid lg:grid-cols-12  lg:px-[0px] px-[0px] lg:py-[20px] gap-[20px] lg:h-[auto] ">
          <div className="col-span-12 max-2xl:col-span-12 relative pb-[70px] lg:pb-0">
            <div className="max-w-[950px] w-[100%] m-auto  lg:pb-[0px] pb-[60px] ">
              {children}
            </div>
          </div>
          {/* <section className="col-span-4 max-2xl:hidden pl-0  ">
            <div className="max-w-[430px] w-[100%] ml-[auto] mb-[20px] sticky top-[30px] hidden lg:flex">
              <ProgressCard />
            </div>
          </section> */}
        </div>
      </div>
    </>
  );
};

export default NcertLayout;
