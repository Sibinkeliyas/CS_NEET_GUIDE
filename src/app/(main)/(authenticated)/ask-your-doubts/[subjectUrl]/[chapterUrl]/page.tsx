import React from "react";
import {
  getChapterWiseAiPromps,
} from "@/utils/api/ai-doubt-module";
import { BOT_TYPE } from "@/types/enums";
import { notFound } from "next/navigation";
import AskYourDoubts from "@/components/chat-ai/ask-ur-doubts";

const Page = async ({
  params,
}: {
  params: { subjectUrl: string; chapterUrl: string };
}) => {
  const { subjectUrl, chapterUrl } = params;
  const chapterUrlParts = chapterUrl.split("-");
  const chapterSlug = chapterUrlParts.slice(2).join("-");

  const prompts = await getChapterWiseAiPromps(BOT_TYPE.ASK_DOUBTS, subjectUrl,chapterSlug );
  if (!subjectUrl || !chapterUrl) notFound();

  return <AskYourDoubts prompts={prompts.data} type={BOT_TYPE.ASK_DOUBTS}/>;
};

export default Page;
