"use client";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import Link from "next/link";
import LockIcon from "@/components/icons/LockIcon";
import CircleArrow from "@/components/icons/CircleArrow";
import { IProgressDataProps } from "@/types";
import TopicList from "./TopicsList";
import { memo, useEffect, useState } from "react";
import { ChapterProgressContent } from "@/types/enums";
import { useParams, useRouter } from "next/navigation";
import { getProgressDetails } from "@/utils/api/progress";
import ProgressCardSkeleton from "./ProgressSkeleton";
import { useDispatch, useSelector } from "@/store";
import { getProgress, getUserProgressData } from "@/store/slices/userActivity";

const ProgressCard = ({ className }: { className?: string }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const params: any = useParams();
  const prgrsData = useSelector(
    (state) => state.userActivityReducer.progressData
  );
  const { subjectUrl, chapterUrl, topicUrl } = params;
  const chapterUrlParts = chapterUrl.split("-");
  const classUrl = chapterUrlParts.slice(0, 2).join("-");
  const chapterSlug = chapterUrlParts.slice(2).join("-");
  const [progressPercent, setProgressPercent] = useState(0);
  const [progressData, setprogressData] = useState<IProgressDataProps>({
    progresData: [],
    topicData: [],
    chapterData: [],
    chapter: null,
  });

  const handleAiPoweredLesson = (topicShortUrl: string) => {
    router.push(
      `/ncert-solutions/${progressData?.chapterData[0]?.subjects?.shortUrl}/${classUrl}-${progressData?.chapterData[0]?.chapters?.shortUrl}/${topicShortUrl}`
    );
  };

  useEffect(() => {
    const getData = async () => {
      await dispatch(getProgress(subjectUrl, classUrl, chapterSlug, topicUrl));
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjectUrl, chapterSlug, classUrl, params, topicUrl]);

  useEffect(() => {
      if (prgrsData) {
        setprogressData(prgrsData);
        const totalTopics = prgrsData.topicData?.length;
        const eachValue = 80 / totalTopics;
        const progressValue =
          eachValue * prgrsData.progresData?.length;
        setProgressPercent(Math.round(progressValue));
      }
  }, [prgrsData, progressData.progresData?.length, progressData.topicData?.length]);


  return (
    <>
      {progressData && progressData?.topicData?.length ? (
        <>
          <Card
            className={cn(
              (className =
                "p-[30px] !bg-[#F5F5F599] dark:!bg-[#171717] sticky top-[20px] !shadow-none w-full")
            )}
            data-test-id="chapter-progress-title-card"
            aria-label="Chapter Topic Wise Progress"
          >
            <CardHeader
              className="pt-[0px] pb-[20px] px-0"
              data-test-id="chapter-progress-title-card-head"
            >
              <h1 className="font-normal text-[14px] text-sm text-[#101010B2] dark:text-[#FFFFFFB2] m-[0px]">
                {ChapterProgressContent.CHAPTER}
              </h1>
              <CardDescription className="font-medium text-xl text-[#101010] dark:text-[#FFFFFF]">
                {progressData?.chapter?.chapterName}
              </CardDescription>
              <Progress
                value={progressPercent}
                className="!mt-[14px} bg-gray-200 [&>*]:bg-blue-700 dark:[&>*]:bg-[#718CD2] dark:bg-[#000000]"
                aria-labelledby={`Chapter Topic Wise ${progressPercent} Percentage completed`}
                title="chapter"
              />
              <h2 className="font-medium text-sm text-[#101010B2] dark:text-[#FFFFFFB2]">
                {progressPercent}
                {ChapterProgressContent.COMPLETED}
              </h2>
            </CardHeader>
            <CardContent className=" p-[0px] m-t[20px]">
              <TopicList
                progressData={progressData}
                classUrl={classUrl}
                handleActionBtn={handleAiPoweredLesson}
              />
            </CardContent>
            <Link
              href={"/"}
              data-test-id="chapter-ranked-quiz"
              aria-label="Chapter Ranked Quiz"
            >
              <CardFooter className="px-[10px] py-[8px] m-[0px] mt-[30px] border !rounded-[4px] bg-[#cce6fc66] grid grid-cols-12 gap-4 dark:bg-[#CCE6FC]">
                <CardHeader className="p-[0px] col-span-10">
                  <CardTitle className="font-medium text-sm text-[#101010] mb-[12px]">
                    {ChapterProgressContent.CHAPTER_RANKED_QUIZ}
                  </CardTitle>
                  <CardDescription className="!flex !items-center font-normal text-xs text-[#101010] gap-1 ">
                    <LockIcon />
                    {ChapterProgressContent.UNLOCK} (
                    {ChapterProgressContent.CURRENTLY_AT} {progressPercent}%)
                  </CardDescription>
                </CardHeader>
                <div className="col-span-2 !flex !justify-end">
                  <CircleArrow />
                </div>
              </CardFooter>
            </Link>
          </Card>
        </>
      ) : (
        <div className="max-w-[430px] w-[100%] ml-[0px] mb-[20px] sticky top-[0px]">
          <ProgressCardSkeleton />
        </div>
      )}
    </>
  );
};
export default memo(ProgressCard);
