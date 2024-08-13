"use client";
import { memo, useEffect, useState } from "react";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import RobotIcon from "@/components/icons/RobotIcon";
import PracticeIcon from "@/components/icons/PracticeIcon";
import ActionCard from "./learning-activity-card";
import CheckCircleIcon from "@/components/icons/CheckCircle";
import LockIcon from "@/components/icons/LockIcon";
import CircleArrow from "@/components/icons/CircleArrow";
import { IProgressDataProps } from "@/types";
import { ChapterProgressContent } from "@/types/enums";
import { useParams, useRouter } from "next/navigation";
import { getProgressDetails } from "@/utils/api/progress";
import MobileProgressSkeleton from "./MobileProgressSkeleton";
import { useDispatch, useSelector } from "@/store";
import { getProgress } from "@/store/slices/userActivity";

const MobileProgressCard = () => {
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
  const [openAccordion, setOpenAccordion] = useState<string[]>([]);
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
     await dispatch(getProgress(subjectUrl, chapterSlug, topicUrl, classUrl));
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjectUrl, chapterSlug, classUrl]);

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
      {progressData && progressData.topicData?.length ? (
        <>
          <div className="w-full bg-[#fff] drak:bg-[#000]">
            <Accordion
              type="multiple"
              value={openAccordion}
              onValueChange={setOpenAccordion}
              className="!bg-[#F5F5F599] rounded-none dark:!bg-[#171717] dark:!border-[#FFFFFF33]"
              aria-label="Chapter Topic Wise Progress"
              data-test-id="chapter-progress-card-mobile"
            >
              <AccordionItem
                value={`item-${progressData.topicData.length + 1}`}
                className="!p-[0px]"
              >
                <AccordionTrigger
                  className="py-[20px] px-[16px] hover:no-underline"
                  data-test-id="chapter-progress-accordian"
                >
                  <CardHeader className="p-[0px]">
                    {openAccordion.includes(
                      `item-${progressData.topicData.length + 1}`
                    ) && (
                      <h3 className="font-normal text-sm text-[#101010B2] !m-[0px] !p-[0px] text-left dark:text-[#FFFFFFB2]">
                        {ChapterProgressContent.CHAPTER}
                      </h3>
                    )}
                    <CardDescription className="font-[400] text-[14px] text-[rgba(16, 16, 16, 1)] dark:text-[#FFFFFF]">
                      {progressData?.chapter?.chapterName}
                    </CardDescription>
                  </CardHeader>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="px-[16px]">
                    <Progress
                      value={progressPercent}
                      className="!mt-[14px} bg-gray-200 [&>*]:bg-blue-700 dark:[&>*]:bg-[#718CD2] dark:bg-[#000000]"
                      aria-labelledby={`Chapter Topic Wise ${progressPercent} Percentage completed`}
                    />
                    <p
                      className="font-medium text-sm text-[#101010B2] mt-[10px] dark:text-[#FFFFFFB2]"
                      data-test-id="progress-value"
                    >
                      {progressPercent}
                      {ChapterProgressContent.COMPLETED}
                    </p>
                    <CardContent className="grid gap-4 p-[0px] !mt-[24px]">
                      <Accordion
                        type="multiple"
                        value={openAccordion}
                        onValueChange={setOpenAccordion}
                        className="w-full m-[0px] p-[0px]"
                        data-test-id="chapter-progress-topic-list"
                      >
                        <div className="h-[382px] overflow-y-auto w-full rounded-md scrollbar-thin pr-[3px]">
                          {progressData &&
                            progressData.topicData.map((topic, index) => {
                              const isPresent = progressData.progresData.some(
                                (data) => data.topics.id === topic.id
                              );
                              return (
                                <AccordionItem
                                  value={`item-${index}`}
                                  className="!p-[8px] !mx-0 !my-[12px] border bg-[#FFFFFF] rounded dark:bg-[#000000]"
                                  key={index}
                                  aria-label={`${topic.topicName} topic accordian`}
                                >
                                  <AccordionTrigger
                                    className="!p-[0px] !m-[0px] hover:no-underline"
                                    data-test-id={`chapter-wise-${topic.topicName}-${index}`}
                                  >
                                    <div className="flex gap-1 items-center justify-start">
                                      {isPresent && (
                                        <div
                                          className="me-[7px]"
                                          data-test-id="progress-check-icon"
                                        >
                                          <CheckCircleIcon />
                                        </div>
                                      )}
                                      <h3 className="font-[400] text-[14px] text-left text-[#101010] dark:text-[#FFFFFF]">
                                        {topic.topicName}
                                      </h3>
                                    </div>
                                  </AccordionTrigger>
                                  <AccordionContent className="!p-[0px] !m-[0px]">
                                    <div className="flex items-center mt-[24px] gap-1 flex-wrap lg:flex-nowrap mb-[12px]">
                                      <ActionCard
                                        className="!text-blue-950 !bg-[#CCE6FC66] dark:!bg-[#CCE6FC] dark:!text-[#101010] text-[12px]"
                                        icon={<RobotIcon />}
                                        content="Start AI Powered Lesson"
                                        ariaLabel={`Start AI Powered Lesson One ${topic.topicName}`}
                                        dataTestId={`ai-lesson-link-${topic.topicName}`}
                                        shortUrl={topic.shortUrl}
                                        handleActionBtn={handleAiPoweredLesson}
                                      />
                                      {/* <ActionCard
                            className="!text-[#016E63] !bg-[#CCFDD066] dark:!bg-[#CCFDD0] dark:!text-[#101010] text-[12px]"
                            icon={<PracticeIcon />}
                            content="Practice MCQ"
                            ariaLabel={`Practice MCQ ${topic.topicName}`}
                            dataTestId={`mcq-practice-link-${topic.topicName}`}
                            handleActionBtn={() => {}}
                          /> */}
                                    </div>
                                  </AccordionContent>
                                </AccordionItem>
                              );
                            })}
                        </div>
                      </Accordion>
                    </CardContent>
                    <Link
                      href={"/"}
                      data-test-id="chapter-ranked-quiz-mobile"
                      aria-label="Chapter Ranked Quize"
                    >
                      <CardFooter className="px-[10px] py-[8px] m-[0px] mt-[30px] border !rounded-[4px] bg-[#CCE6FC66] grid grid-cols-12 gap-4 dark:bg-[#CCE6FC]">
                        <CardHeader className="p-[0px] col-span-10">
                          <CardTitle className="font-normal text-sm text-[#101010] m-[0px]">
                            {ChapterProgressContent.CHAPTER_RANKED_QUIZ}
                          </CardTitle>
                          <CardDescription className="!flex !items-center font-normal text-xs text-[#101010] gap-2">
                            <LockIcon />
                            {ChapterProgressContent.UNLOCK} (
                            {ChapterProgressContent.CURRENTLY_AT}{" "}
                            {progressPercent}%)
                          </CardDescription>
                        </CardHeader>
                        <div className="col-span-2 !flex !justify-end">
                          <CircleArrow />
                        </div>
                      </CardFooter>
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </>
      ) : (
        <>
          <MobileProgressSkeleton />
        </>
      )}
    </>
  );
};

export default memo(MobileProgressCard);
