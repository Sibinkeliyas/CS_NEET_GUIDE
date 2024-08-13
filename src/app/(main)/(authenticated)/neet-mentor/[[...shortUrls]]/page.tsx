import React from "react";
import { getCommonAiPrompts } from "@/utils/api/ai-doubt-module";
import { BOT_TYPE } from "@/types/enums";
import AskYourDoubts from "@/components/chat-ai/ask-ur-doubts";

const Page = async () => {
  const prompts = await getCommonAiPrompts(BOT_TYPE.COMMON_BOT);
  return <AskYourDoubts prompts={prompts.data} type={BOT_TYPE.COMMON_BOT} />;
};

export default Page;
