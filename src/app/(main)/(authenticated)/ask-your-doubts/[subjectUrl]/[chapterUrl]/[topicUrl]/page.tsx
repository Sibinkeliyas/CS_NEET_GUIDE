import React from "react";
import DoubtModule from "@/components/chat-ai/doubt-module";
import { getTopicWiseAiPromps } from "@/utils/api/ai-doubt-module";
import { BOT_TYPE } from "@/types/enums";
import { notFound } from "next/navigation";
import { getNcertSolutions } from "@/utils/api/ncert-solutions";
import AskYourDoubts from "@/components/chat-ai/ask-ur-doubts";

const Page = async ({
  params,
}: {
  params: { subjectUrl: string; chapterUrl: string; topicUrl: string };
}) => {
  const { subjectUrl, chapterUrl, topicUrl } = params;
  const chapterUrlParts = chapterUrl.split("-");
  const chapterSlug = chapterUrlParts.slice(2).join("-");

  const prompts = await getTopicWiseAiPromps(
    BOT_TYPE.ASK_DOUBTS,
    subjectUrl,
    chapterSlug,
    topicUrl
  );

  if (!subjectUrl || !chapterUrl || !topicUrl) notFound();

  return <AskYourDoubts prompts={prompts.data} type={BOT_TYPE.ASK_DOUBTS}/>;
};

export default Page;
