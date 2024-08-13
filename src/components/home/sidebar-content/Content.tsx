import BlogsAndArticlesIcon from "@/components/icons/BlogsAndArticlesIcon";
import NcertBookIcon from "@/components/icons/NcertBookIcon";
import QuestionAndAnswerIcon from "@/components/icons/QAndAIcon";
import SimulationIcon from "@/components/icons/SimulationsIcon";
import StudyMaterialIcon from "@/components/icons/StudyMaterialIcon";
import React from "react";
import ContentCard from "./ContentCard";
import { IChapterDetailsProps, ISubjectDetailsProps } from "@/types";
import Link from "next/link";
import RobotIcon from "@/components/icons/Robot";

interface IContentList {
  id: string;
  name: string;
  logo: React.ReactNode;
  link: string;
}
const LayoutContent = ({
  chapterDetail,
}: {
  chapterDetail: {
    chapter: IChapterDetailsProps;
    subject: ISubjectDetailsProps;
  } | null;
}) => {
  const contentList: IContentList[] = [
    // {
    //   id: "ncert-book",
    //   name: "NCERT Book",
    //   logo: <NcertBookIcon />,
    //   link: `/ncert-solutions/${chapterDetail?.subject.shortUrl}/${chapterDetail?.chapter.Classes.shortUrl}-${chapterDetail?.chapter.shortUrl}/${chapterDetail?.chapter.topicShortUrl}`,
    // },
    {
      id: 'revision-notes',
      name: "Revision Notes",
      logo: <StudyMaterialIcon />,
      link: `/revision-notes/${chapterDetail?.subject.shortUrl}/${chapterDetail?.chapter.Classes.shortUrl}-${chapterDetail?.chapter?.shortUrl}`,
    },
    {
      id: "doubt-module",
      name: "Ask Your Doubts",
      logo: <RobotIcon />,
      link: `/ask-your-doubts/${chapterDetail?.subject.shortUrl}/${chapterDetail?.chapter.Classes.shortUrl}-${chapterDetail?.chapter?.shortUrl}`,
    },
    // {
    //   name: "Interactive Simulations",
    //   logo: <SimulationIcon />,
    //   link: "",
    // },
    // {
    //   name: "Question & Answer",
    //   logo: <QuestionAndAnswerIcon />,
    //   link: "",
    // },
    // {
    //   name: "Blogs/Articles",
    //   logo: <BlogsAndArticlesIcon />,
    //   link: "",
    // },
  ];
  return (
    <div className="md:py-[40px] md:px-[32px] lg:py-[40px] lg:px-[32px] p-[16px]">
      <h1
        className="font-medium text-xl md:mb-[40px] lg:mb-[40px] mb-[30px]"
        data-test-id="chapter-details-card-chapter-title"
      >
        {chapterDetail?.chapter?.chapterName}
      </h1>
      <div>
        {contentList.map((item, index) => {
          return (
            <div key={index} className="md:mt-[18px] lg:mt-[18px] mt-[16px]">
              <Link href={item.link}>
                <ContentCard logo={item.logo} name={item.name} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default LayoutContent;
