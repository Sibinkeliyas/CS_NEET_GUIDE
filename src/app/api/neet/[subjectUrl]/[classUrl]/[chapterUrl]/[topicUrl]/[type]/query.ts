import prisma from '@/lib/prisma';

export const postProgressData = async (
  subjectUrl: string,
  chapterUrl: string,
  topicUrl: string,
  userId: string
) => {
  try {
    const existingProgress = await prisma.progress.findMany({
      where: {
        subjectId: Number(subjectUrl),
        chapterId: Number(chapterUrl),
        topicId: Number(topicUrl),
        userId: Number(userId),
      },
    });

    if (existingProgress.length > 0) {
      return {
        message: 'Progress entry already exists',
        data: existingProgress,
      };
    }

    const PostProgress = await prisma.progress.create({
      data: {
        chapterId: Number(chapterUrl),
        subjectId: Number(subjectUrl),
        topicId: Number(topicUrl),
        userId: Number(userId),
      },
    });
    return PostProgress;
  } catch (error) {
    throw error;
  }
};

export const getProgressData = async (
  subjectUrl: string,
  chapterUrl: string,
  topicUrl: string,
  userId: number
) => {
  try {
    let progresData: any = [];
    if (userId !== undefined && userId !== null) {
      progresData = await prisma.progress.findMany({
        where: {
          subjects: { shortUrl: subjectUrl, status: 1, deleteStatus: 0 },
          chapters: { shortUrl: chapterUrl, status: 1, deleteStatus: 0 },
          userId,
        },
        select: {
          subjects: {
            select: { id: true, subjectName: true, shortUrl: true },
          },
          chapters: {
            select: { id: true, chapterName: true, shortUrl: true },
          },
          topics: {
            select: { id: true, topicName: true, shortUrl: true },
          },
        },
      });
    }

    // const chapterData = await prisma.topics.findMany({
    //   where: {
    //     subjects: { shortUrl: subjectUrl, status: 1, deleteStatus: 0 },
    //     chapters: { shortUrl: chapterUrl, status: 1, deleteStatus: 0 },
    //     shortUrl: topicUrl,
    //     status: 1,
    //     deleteStatus: 0,
    //   },

    //   select: {
    //     subjects: {
    //       select: { id: true, subjectName: true, shortUrl: true },
    //     },
    //     chapters: {
    //       select: { id: true, chapterName: true, shortUrl: true },
    //     },
    //   },
    // });
    
    
    const chapter = await prisma.chapters.findFirst({
      where: { shortUrl: chapterUrl, deleteStatus: 0, status: 1 },
    });

    const topicData = await prisma.topics.findMany({
      where: { chapters: { shortUrl: chapterUrl, status: 1, deleteStatus: 0 } },
    });
    return { progresData, topicData, chapter };

  } catch (error) {
    throw error;
  }
};
