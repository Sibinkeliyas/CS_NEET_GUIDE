"use client";
import React from "react";
import { BOT_TYPE } from "@/types/enums";
import DoubtModule from "../doubt-module";
import { useParams } from "next/navigation";
import { IPrompts } from "@/types/ai";

const AskYourDoubts = ({ prompts, type }: { prompts?: IPrompts[], type:BOT_TYPE }) => {
  const params: any = useParams();
  const { subjectUrl, chapterUrl, topicUrl } = params;
  const chapterUrlParts = chapterUrl?.split("-");
  const chapterSlug = chapterUrlParts?.slice(2).join("-");

  return (
    <div className="px-4 h-[100%] ">
      <div className="flex justify-center items-center w-full">
        <div className="w-[100%] m-auto">
          <DoubtModule
            type={type}
            prompts={prompts}
            subjectUrl={subjectUrl}
            chapterUrl={chapterSlug}
            topicUrl={topicUrl}
            topicName={topicUrl || chapterSlug}
          />
        </div>
      </div>
    </div>
  );
};

export default AskYourDoubts;
