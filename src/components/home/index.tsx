'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import SubjectIntroduction from './subject-introduction';
import { IChapterDetailsProps, ISubjectDetailsProps } from '@/types';
const ChapterDetails = dynamic(() => import('./sidebar-content'));
const HomeComponent = ({ data }: { data: ISubjectDetailsProps[] }) => {
  const [introductionData, setIntroductionData] = useState<{
    chapter: IChapterDetailsProps;
    subject: ISubjectDetailsProps;
  } | null>(null);

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <SubjectIntroduction
            data={data}
            setIntroductionData={setIntroductionData}
          />
        </SheetTrigger>
        <SheetContent
          className="!p-[0px] w-screen md:min-w-[537px] lg:min-w-[537px]"
          hideCancelBtn
          aria-label="Chapter Details"
          data-test-id="chapter-details-model"
        >
          <ChapterDetails data={introductionData || null} />
        </SheetContent>
      </Sheet>
    </>
  );
};
export default HomeComponent;
