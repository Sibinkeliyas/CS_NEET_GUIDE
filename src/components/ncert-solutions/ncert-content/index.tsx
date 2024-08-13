import React, { useState } from 'react';
import parser from 'html-react-parser';
import { INcertProps } from '@/types/ncert';
import MainCard from '@/components/common/MainCard';
import dynamic from 'next/dynamic';
import { ERROR, HOMEPAGE } from '@/types/enums';
import CardNavigationSkelton from './CardNavigationSkelton';
import Loading from '@/components/common/Loading';
import { cn } from '@/lib/utils';
import ContentOverlay from './ContentOverlay';
const CardNavigation = dynamic(
  () => import('@/components/ncert-solutions/ncert-content/CardNavigation'),
  {
    loading: () => <CardNavigationSkelton />,
  }
);

const NcertContent = ({
  ncertData,
  loading,
  isHidden,
  setLoading,
  setOpen,
}: {
  ncertData: INcertProps;
  loading: boolean;
  isHidden: boolean;
  setLoading: (loading: boolean) => void;
  setOpen: (open: boolean) => void;
}) => {
  return (
    <>
      <section className="relative mb-[30px]">
        {loading && <Loading />}
        <MainCard
          title=""
          className={cn(isHidden && '!pb-0', 'overflow-hidden')}
          cardAction={
            !isHidden ? (
              <CardNavigation ncertData={ncertData} setLoading={setLoading} />
            ) : undefined
          }
        >
          <>
            <button
              className="block p-0 ml-auto mt-[-10px] mb-[10px] dark:text-[#6cb7fc] text-[#0b57d0]"
              onClick={() => setOpen(!isHidden)}
            >
              {isHidden ? HOMEPAGE.EXPAND : HOMEPAGE.CLOSE}
            </button>
            <div
              tabIndex={0}
              className={cn(
                `scrollbar-thin dynamic_content overflow-auto mt-[10px] lg:mt-[0px] lg:h-[59dvh] md:h-[58dvh] h-[48dvh]  [transition:height_200ms]`,
                isHidden && '!h-[85px] !pb-0 !overflow-y-hidden relative'
              )}
            >
              {isHidden ? (
                <>
                  <div className="px-4">
                    <p>Topic</p>
                    <h1>{ncertData.topics?.topicName}</h1>
                  </div>
                </>
              ) : ncertData.content ? (
                parser(ncertData.content)
              ) : (
                <h3
                  style={{
                    color: '#101010 !important',
                    fontSize: '15px !important',
                  }}
                  className="absolute top-[50%] left-2/4 -translate-x-1/2 -translate-y-1/2"
                >
                  {ERROR.NO_DATA_FOUND}
                </h3>
              )}
              {isHidden && (
                <>
                  <ContentOverlay />
                </>
              )}
            </div>
          </>
        </MainCard>
      </section>
    </>
  );
};

export default NcertContent;
