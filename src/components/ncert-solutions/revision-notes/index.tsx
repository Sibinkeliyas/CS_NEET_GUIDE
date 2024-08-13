import React from 'react';
import parser from 'html-react-parser';
import { INcertProps } from '@/types/ncert';
import AiTextArea from './AiTextArea';
import BreadCrumb, { BreadCrumbType } from '@/components/common/BreadCrumb';
import { IPrompts } from '@/types/ai';

const RevisionNotes = ({
  ncertNotes,
  chapterUrl,
  subjectUrl,
  classUrl,
  prompts
}: {
  ncertNotes: INcertProps;
  subjectUrl: string;
  chapterUrl: string;
  classUrl: string;
  prompts?:IPrompts[]
}) => {
  const breadCrumbData: BreadCrumbType[] = [
    {
      title: 'NEET Revision Notes',
      link: `/revision-notes/${subjectUrl}/${classUrl}-${chapterUrl}`,
    },
    {
      title: subjectUrl.replaceAll('-', ' '),
      link: `/revision-notes/${subjectUrl}/${classUrl}-${chapterUrl}`,
    },
    {
      title: chapterUrl.replaceAll('-', ' '),
      link: `/revision-notes/${subjectUrl}/${classUrl}-${chapterUrl}`,
    },
  ];
  return (
    <>
      <div className="lg:pl-5 md:pl-2 ">
        <BreadCrumb items={breadCrumbData} title="Home" />
      </div>
      <div className=" scrollbar-thin dynamic_content max-w-[100%] p-2 lg:p-5 lg:pt-0 pt-3 ">
        {ncertNotes.content && parser(ncertNotes.content)}
      </div>

      <div
        className={`left-0 lg:sticky fixed bottom-[20px] w-full  z-50 max-w-[800px] m-auto`}
      >
        <AiTextArea prompts={prompts}/>
      </div>
    </>
  );
};

export default RevisionNotes;
