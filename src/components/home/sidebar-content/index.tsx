import React from "react";
import Header from "./header";
import LayoutContent from "./Content";
import { IChapterDetailsProps, ISubjectDetailsProps } from "@/types";

const ChapterDetails = ({
  data,
}: {
  data: { chapter: IChapterDetailsProps; subject: ISubjectDetailsProps } | null;
}) => {
  return (
    <>
      <Header subjectDetail={data?.subject || null} />
      <LayoutContent chapterDetail={data}/>
    </>
  );
};
export default ChapterDetails;
