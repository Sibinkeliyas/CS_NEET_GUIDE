import React from 'react';
import NcertSolution from '@/components/ncert-solutions';
import { Metadata } from 'next';
import { getNcertMetaData, getNcertSolutions } from '@/app/api/neet/[subjectUrl]/[classUrl]/[chapterUrl]/[topicUrl]/ncert-solutions/query';
export const revalidate = 10

export async function generateMetadata({ params }: { params: { subjectUrl: string; chapterUrl: string; topicUrl: string }}): Promise<Metadata> {
  const { subjectUrl, chapterUrl, topicUrl } = params;
  const chapterUrlParts = chapterUrl.split("-");
  const classUrl = chapterUrlParts.slice(0, 2).join('-');
  const chapterSlug = chapterUrlParts.slice(2).join("-");

  const metaData = await getNcertMetaData(
    subjectUrl,
    classUrl,
    chapterSlug,
    topicUrl
  );

  return {
    title: metaData?.title,
    description: metaData?.description,
    keywords: metaData?.keyword,
  };
}

const Page = async ({ params }: {
  params: { subjectUrl: string; chapterUrl: string; topicUrl: string };
}) => {
  const { subjectUrl, chapterUrl, topicUrl } = params;
  const chapterUrlParts = chapterUrl.split("-");
  const classUrl = chapterUrlParts.slice(0, 2).join('-');
  const chapterSlug = chapterUrlParts.slice(2).join("-");

  const content = await getNcertSolutions(
    subjectUrl,
    classUrl,
    chapterSlug,
    topicUrl
  );

  return (
    content && (
      <>
        <NcertSolution ncertData={content} />
        {/* <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        /> */}
      </>
    )
  );
};

export default Page;
