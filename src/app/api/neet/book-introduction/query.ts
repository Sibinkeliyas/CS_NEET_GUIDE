import prisma from "@/lib/prisma";

export const getIntroductionData = async () => {
  try {
    const bookDetails = await prisma.subjects.findMany({
      where: {
        deleteStatus: 0,
        status: 1,
      },
      include: { chapters: { include: { Classes: true, topics : true } } },
    });

    const formattedBookDetails = bookDetails.map((bookDetail) => ({
      id: bookDetail.id,
      name: bookDetail.subjectName,
      shortUrl: bookDetail.shortUrl,
      chapters: bookDetail.chapters.map((chapter) => ({
        id: chapter.id,
        subjectId: chapter.subjectId,
        classId: chapter.classId,
        chapterName: chapter.chapterName,
        shortUrl: chapter.shortUrl,
        Classes: {
          id: chapter.Classes.id,
          className: chapter.Classes.className,
          shortUrl: chapter.Classes.shortUrl,
        },
        topicShortUrl: chapter.topics[0].shortUrl
      })),
    }));
    return formattedBookDetails;
  } catch (error) {
    throw error;
  }
};
