import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import RobotIcon from "@/components/icons/RobotIcon";
import PracticeIcon from "@/components/icons/PracticeIcon";
import ActionCard from "./learning-activity-card";
import CheckCircleIcon from "@/components/icons/CheckCircle";
import { IProgressDataProps } from "@/types";
import { useParams } from "next/navigation";

const TopicList = ({
  progressData,
  handleActionBtn,
}: {
  progressData: IProgressDataProps;
  classUrl: string;
  handleActionBtn: (shortUrl: string) => void;
}) => {
  const params = useParams();
  const [acrdionDefaultVlue, setAccordionDefaultVlue] = useState(`item-${params?.topicUrl}`)

  useEffect(() => {
    const element = document.getElementById(`item-${params?.topicUrl}`);
    setAccordionDefaultVlue(`item-${params?.topicUrl}`)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  }, [ params?.topicUrl ]);
  
  return (
    <>
      <Accordion
        type="single"
        collapsible
        className="w-full m-[0px] p-[0px] border-[solid] border-[#101010]"
        data-test-id="chapter-progress-topic-list"
        defaultValue={acrdionDefaultVlue}
        value={acrdionDefaultVlue}
      >
        <div className="h-[382px] overflow-y-auto w-full rounded-md scrollbar-thin mb-30px pr-[5px]">
          {progressData &&
            progressData.topicData.map((topic, index) => {
              const isPresent = progressData.progresData.some(
                (data) => data.topics.id === topic.id
              );
              return (
                <AccordionItem
                  value={`item-${topic.shortUrl}`}
                  className="!p-[8px] !mx-0 !my-[12px] border bg-[#FFFFFF] rounded dark:bg-[#000000]"
                  key={index}
                  data-test-id={`${topic.topicName}-progress-list`}
                  aria-label={`${topic.topicName} Topic Accordian`}
                  id={`item-${topic.shortUrl}`}
                >
                  <AccordionTrigger
                    className="!p-[0px] !m-[0px] hover:no-underline"
                    data-test-id={`${topic.topicName}-progress-list-${index}`}
                    aria-label={`${topic.topicName} Accordian`}
                    onClick={() => setAccordionDefaultVlue(`item-${topic.shortUrl}`)}
                  >
                    <div className="flex gap-1 items-center justify-start w-full">
                      {isPresent && (
                        <div className="me-[7px]">
                          <CheckCircleIcon />{" "}
                        </div>
                      )}
                      <h3 className="font-[400] text-[14px] text-left text-[#101010] dark:text-[#FFFFFF] !w-full !max-w-[100%] multi-line-truncate">
                        {topic.topicName}
                      </h3>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="!p-[0px] !m-[0px]">
                    <div className="flex items-center mt-[24px] gap-1  flex-wrap mb-[12px]">
                      <ActionCard
                        className="!text-[#021863] !bg-[#CCE6FC66] !p-[8px] dark:!bg-[#CCE6FC] dark:!text-[#101010] border-0  font-medium  flex-[1] max-w-max"
                        icon={<RobotIcon />}
                        content="Start AI Powered Lesson"
                        ariaLabel={`Start AI Powered Lesson One ${topic.topicName}`}
                        dataTestId={`ai-lesson-link-${topic.topicName}-desktop`}
                        shortUrl={topic.shortUrl}
                        handleActionBtn={handleActionBtn}
                      />
                      {/* <ActionCard
                        className="!text-[#016E63] !bg-[#CCFDD066] !p-[8px] dark:!bg-[#CCFDD0] dark:!text-[#101010] border-0  font-medium  flex-[1]"
                        icon={<PracticeIcon />}
                        content="Practice MCQ"
                        ariaLabel={`Practice MCQ ${topic.topicName}`}
                        dataTestId={`mcq-practice-link-${topic.topicName}-desktop`}
                        handleActionBtn={() => {}}
                      /> */}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
        </div>
      </Accordion>
    </>
  );
};
export default TopicList;
