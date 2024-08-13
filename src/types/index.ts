import { AiProps } from "./ai";
import { AuthProps } from "./auth";
import { SyllabusProps } from "./ncert";
import { IUserActivityProps } from "./userActivity";

export interface PageMetaData {
  page_id: number;
  title: string;
  description: string;
  keyword: string;
  added_date: string;
  updated_date: string;
}

export type DefaultRootStateProps = {
  userProfile: AuthProps;
  syllabus: SyllabusProps;
  ai: AiProps;
  userActivity: IUserActivityProps;
};

export enum AUTH_ROUTERS {
  OTP_VERIFICATION = "otp-verification",
  SIGN_IN = "sign-in",
  SIGN_UP = "sign-up",
}
export interface IClassesDetailsProps {
  id: number;
  className: string;
  shortUrl: string;
}
export interface IChapterDetailsProps {
  id: number;
  subjectId: number;
  classId: number;
  chapterName: string;
  shortUrl: string;
  topicShortUrl: string;
  Classes: IClassesDetailsProps;
}
export interface ISubjectDetailsProps {
  id: number;
  name: string;
  shortUrl: string;
  chapters: IChapterDetailsProps[];
}

export interface ISubjectProps {
  id: number;
  shortUrl: string;
  subjectName: string;
}
export interface IChapterProps {
  chapters: { chapterName: string; id: number; shortUrl: string };
  subjects: ISubjectProps;
}
export interface ITopicProps {
  id: number;
  shortUrl: string;
  topicName: string;
}
export interface IProgressData {
  chapters: IChapterProps;
  subjects: ISubjectProps;
  topics: ITopicProps;
}

export interface ITopicDatas {
  id: number;
  subjectId: number;
  chapterId: number;
  topicName: string;
  shortUrl: string;
}

interface IChapterDataProps {
  id: number;
  chapterName: string;
  shortUrl:string
}
export interface IProgressDataProps {
  progresData: IProgressData[];
  topicData: ITopicDatas[];
  chapterData: IChapterProps[];
  chapter: IChapterDataProps | null;
}

export interface IMenuProps {
  openAuthModal: boolean;
  openDrawer: boolean
}
