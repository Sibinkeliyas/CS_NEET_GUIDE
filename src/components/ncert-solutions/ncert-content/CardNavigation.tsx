import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import Button from "../../common/Button";
import LeftArrow from "../../icons/LeftArrow";
import RightArrow from "../../icons/RightArrow";
import { useDispatch, useSelector } from "@/store";
import { useParams, usePathname, useRouter } from "next/navigation";
import { PATHNAMES } from "@/types/enums";
import { INcertProps, INcertSidebarChapterProps, INcertSidebarProps } from "@/types/ncert";
import { postProgressData } from "@/utils/api/progress";
import { updateLoginModel } from "@/store/slices/menu";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { getUserProgressData } from "@/store/slices/userActivity";

const CardNavigation = ({
  ncertData,
  setLoading,
}: {
  ncertData?: INcertProps;
  setLoading: (loading: boolean) => void;
}) => {
  const { syllabus } = useSelector((state) => state.syllabusReducer);
  const { isAuthenticated, isInitialized } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const params: any = useParams();
  const router = useRouter();
  const { subjectUrl, chapterUrl, topicUrl } = params;
  const chapterUrlParts = chapterUrl.split("-");
  const classUrl = chapterUrlParts.slice(0, 2).join("-");
  const chapterSlug = chapterUrlParts.slice(2).join("-");
  const { progressData } = useSelector((state) => state.userActivityReducer);
  const [disable, setDisable] = useState<-1 | 0 | 1>(0);
  const [basePath] = useState<string>(PATHNAMES.NCERT_PATH);

  const handleNext = useCallback(
    async (count: 1 | -1) => {
      setLoading(true);
      if (isAuthenticated && isInitialized) {
        {
          ncertData &&
            (await postProgressData(
              ncertData?.subjectId || 0,
              ncertData?.chapterId || 0,
              ncertData?.topicId || 0
            ));
        }

        if (syllabus && params) {
          const curntSubject = syllabus.find(
            (sub) => sub.shortUrl === subjectUrl
          );
          const currentTopics = curntSubject?.chapters.find(
            (chp) =>
              chp.shortUrl === chapterSlug && chp.Classes.shortUrl === classUrl
          );

          const subjectIndex = syllabus.findIndex(
            (sub) => sub.shortUrl === subjectUrl
          );
          const curntChapIndex = curntSubject?.chapters.findIndex(
            (chp) =>
              chp.shortUrl === chapterSlug && chp.Classes.shortUrl === classUrl
          );
          const curntTopicIndex = currentTopics?.topics.findIndex(
            (topic) => topic.shortUrl === topicUrl
          );

          if (
            curntTopicIndex !== undefined &&
            currentTopics?.topics[curntTopicIndex + count]?.shortUrl
          ) {
            router.push(
              `/${basePath}/${subjectUrl}/${chapterUrl}/${
                currentTopics?.topics[curntTopicIndex + count].shortUrl
              }`
            );
          } else {
            if (
              curntChapIndex !== undefined &&
              curntSubject?.chapters[curntChapIndex + count]?.shortUrl
            ) {
              router.push(
                `/${basePath}/${subjectUrl}/${
                  curntSubject?.chapters[curntChapIndex + count].Classes
                    .shortUrl
                }-${curntSubject?.chapters[curntChapIndex + count].shortUrl}/${
                  curntSubject?.chapters[curntChapIndex + count].topics[
                    count === 1
                      ? 0
                      : curntSubject?.chapters[curntChapIndex + count].topics
                          .length - 1
                  ].shortUrl
                }`
              );
            } else {
              if (
                subjectIndex !== undefined &&
                syllabus[subjectIndex + count]?.shortUrl
              ) {
                router.push(
                  `/${basePath}/${syllabus[subjectIndex + count]?.shortUrl}/${
                    syllabus[subjectIndex + count].chapters[0].Classes.shortUrl
                  }-${syllabus[subjectIndex + count].chapters[0].shortUrl}/${
                    syllabus[subjectIndex + count].chapters[0].topics?.[0]
                      .shortUrl
                  }`
                );
              }
            }
          }
        }
      } else {
        dispatch(updateLoginModel(true));
      }
      setTimeout(() => {
        setLoading(false);
      }, 500);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      basePath,
      dispatch,
      isAuthenticated,
      isInitialized,
      ncertData,
      params,
      router,
      syllabus,
    ]
  );

  useMemo(() => {
    if (params.shortUrls && syllabus.length) {
      const [subjectUrl, chapterUrl, topicUrl] = params.shortUrls;
      const chapterUrlParts = chapterUrl.split("-");
      const classUrl = chapterUrlParts.slice(0, 2).join("-");
      const chapterSlug = chapterUrlParts.slice(2).join("-");

      const curntSubject = syllabus.find((sub) => sub.shortUrl === subjectUrl);
      const currentTopics = curntSubject?.chapters.find(
        (chp) =>
          chp.shortUrl === chapterSlug && chp.Classes.shortUrl === classUrl
      );

      const subjectIndex = syllabus.findIndex(
        (sub) => sub.shortUrl === subjectUrl
      );
      const curntChapIndex = curntSubject?.chapters.findIndex(
        (chp) =>
          chp.shortUrl === chapterSlug && chp.Classes.shortUrl === classUrl
      );
      const curntTopicIndex = currentTopics?.topics.findIndex(
        (topic) => topic.shortUrl === topicUrl
      );

      if (
        curntChapIndex !== undefined &&
        curntTopicIndex !== undefined &&
        !syllabus[subjectIndex + 1]?.shortUrl &&
        !syllabus[subjectIndex].chapters[curntChapIndex + 1] &&
        !syllabus[subjectIndex].chapters[curntChapIndex].topics[
          curntTopicIndex + 1
        ]?.shortUrl
      ) {
        setDisable(1);
      } else if (
        curntChapIndex !== undefined &&
        curntTopicIndex !== undefined &&
        !syllabus[subjectIndex - 1]?.shortUrl &&
        !syllabus[subjectIndex].chapters[curntChapIndex - 1] &&
        !syllabus[subjectIndex].chapters[curntChapIndex].topics[
          curntTopicIndex - 1
        ]?.shortUrl
      ) {
        setDisable(-1);
      } else setDisable(0);
    }
  }, [params.shortUrls, syllabus]);

  // useMemo(() => {
  //   setBasePath(
  //     pathname.includes(PATHNAMES.NCERT_PATH)
  //       ? PATHNAMES.NCERT_PATH
  //       : PATHNAMES.STUDY_NOTES
  //   );
  // }, [pathname]);

  return (
    <div className="flex justify-between items-center lg:py-[10px] pt-[10px] pb-[5] mt-[-24px] lg:mt-[0px] w-full sticky bottom-0">
      <Button
        onClick={() => handleNext(-1)}
        text={"Previous"}
        dataTestId="Previous-btn"
        ariaLabel="Previous button"
        className="bg-[#F5F5F5] text-[#101010] lg:py-[20px] py-[12px] lg:px-[15px] px-[12px] shadow-none lg:text-[14px] text-[12px] hover:bg-[#F5F5F5] hover:scale-[0.90] dark:bg-[#101010] dark:text-[#fff] dark:hover:bg-[#101010]"
        startIcon={<ChevronLeftIcon className="dark:text-white text-black" />}
        key={0}
        disabled={disable === -1}
      />

      <Button
        onClick={() => handleNext(1)}
        text={"Next"}
        dataTestId="next-btn"
        ariaLabel="Next button"
        className="group bg-[#101010] text-[#fff] lg:py-[20px] py-[12px] lg:px-[15px] px-[12px] shadow-none lg:text-[14px] text-[13px] hover:bg-[#101010] hover:scale-[0.90] dark:bg-[#fff] dark:text-[#000] dark:hover:bg-[#fff]"
        endIcon={<ChevronRightIcon className="dark:text-black text-white " />}
        key={1}
        disabled={disable === 1}
      />
    </div>
  );
};

export default memo(CardNavigation);
