'use client';
import React from 'react';
import { INcertProps } from '@/types/ncert';
import { useParams, usePathname } from 'next/navigation';
import BreadCrumb from '@/components/common/BreadCrumb';
import parser from 'html-react-parser';
import AiTextArea from './revision-notes/AiTextArea';

const NcertSolution = ({ ncertData }: { ncertData: INcertProps }) => {
  const params: any = useParams();
  const pathname = usePathname();
  const { subjectUrl, chapterUrl, topicUrl } = params;
  const chapterUrlParts = chapterUrl.split('-');
  const chapterSlug = chapterUrlParts.slice(2).join('-');

  const breadcrumbItems = [
    { title: subjectUrl.replaceAll('-', ' '), link: pathname },
    {
      title: chapterSlug.replaceAll('-', ' '),
      link: `/revision-notes/${subjectUrl}/${chapterUrl}`,
    },
    { title: topicUrl.replaceAll('-', ' '), link: pathname },
  ];

  return (
    <>
      <BreadCrumb items={breadcrumbItems} title="NCERT Solutions" />

      <div className="scrollbar-thin dynamic_content  max-w-[100%] p-2 lg:p-5 pt-10 ">
        {ncertData.content && parser(ncertData.content)}
      </div>
      <div className={`left-0 lg:sticky fixed bottom-[20px] w-full  z-50 `}>
        <AiTextArea />
      </div>
    </>
  );
};

export default NcertSolution;
