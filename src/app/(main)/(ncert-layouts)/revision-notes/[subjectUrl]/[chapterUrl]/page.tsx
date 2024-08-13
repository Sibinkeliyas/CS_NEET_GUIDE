import React from "react";
import { getRevisionData } from "@/app/api/neet/[subjectUrl]/[classUrl]/[chapterUrl]/revision-notes/query";
import RevisionNotes from "@/components/ncert-solutions/revision-notes";
import { Metadata } from "next";
import { getRevisionNoteMetaData } from "@/app/api/neet/[subjectUrl]/[classUrl]/[chapterUrl]/[topicUrl]/ncert-solutions/query";
import { getPrompts } from "@/app/api/ai/query";
import { BOT_TYPE } from "@/types/enums";

export async function generateMetadata({
  params,
}: {
  params: { subjectUrl: string; chapterUrl: string };
}): Promise<Metadata> {
  const { subjectUrl, chapterUrl } = params;
  const chapterUrlParts = chapterUrl.split("-");
  const classUrl = chapterUrlParts.slice(0, 2).join("-");
  const chapterSlug = chapterUrlParts.slice(2).join("-");

  const metaData = await getRevisionNoteMetaData(
    subjectUrl,
    classUrl,
    chapterSlug
  );

  return {
    title: metaData?.title,
    description: metaData?.description,
    keywords: metaData?.keyword,
  };
}

const Page = async ({
  params,
}: {
  params: { subjectUrl: string; chapterUrl: string; topicUrl: string };
}) => {
  const { subjectUrl, chapterUrl } = params;
  const chapterUrlParts = chapterUrl.split("-");
  const classUrl = chapterUrlParts.slice(0, 2).join("-");
  const chapterSlug = chapterUrlParts.slice(2).join("-");
  const [data, prompts] = await Promise.all([
    getRevisionData(subjectUrl, chapterSlug, classUrl),
    getPrompts(BOT_TYPE.ASK_DOUBTS, subjectUrl, chapterSlug),
  ]);
  return (
    <RevisionNotes
      ncertNotes={data}
      subjectUrl={subjectUrl}
      chapterUrl={chapterSlug}
      classUrl={classUrl}
      prompts={prompts}
    />
  );
};

export default Page;
