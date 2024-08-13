import { AI_BASE_URL } from "@/config";
import prisma from "@/lib/prisma";
import { Api_endpoint } from "@/types/enums";
import { customFetch } from "@/utils";

export const askQuestion = async (
  message: string,
  chapter?: string,
  history?: string,
  url?: string
): Promise<{
  success: boolean;
  result: string;
  history: string;
  detail: string;
}> => {
  try {
    const result = await customFetch(
      `${AI_BASE_URL}/${Api_endpoint.doubt_module}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, history, url, chapter }),
      }
    );
    return { result: result?.result, history: result?.data, success: true, detail: result?.detail, };
  } catch (error) {
    throw error;
  }
};

export const getAiDoubtChatCount = async (
  userId: number,
  subjectUrl?: string | null,
  chapterUrl?: string | null,
  topicUrl?: string | null
) => {
  try {
    return await prisma.aiDoubts.count({
      where: {
          ...( subjectUrl ? { subjects: { shortUrl: subjectUrl }} : { subjectId: null }),
          ...( chapterUrl ? { chapters: { shortUrl: chapterUrl }} : { chapterId: null }),
          ...( topicUrl ? { topics: { shortUrl: topicUrl }} : { topicId: null }),
        userId,
          deleteStatus: 0
      },
    });
  } catch (error) {
    throw error;
  }
};

export const findSubject = async (shortUrl:string) => {
  try {
    return prisma.subjects.findFirst({ where: { shortUrl, deleteStatus: 0, status: 1 }})
  } catch (error) {
    throw error
  }
}

export const findTopic = async (shortUrl:string) => {
  try {
    return prisma.topics.findFirst({ where: { shortUrl ,deleteStatus: 0, status: 1}})
  } catch (error) {
    
  }
}

export const insertDoubtModuleHistory = async (
  userId: number,
  question: string,
  answer: string,
  history: string,
  contentUrls: { subjectUrl: string; chapterId: number; topicUrl: string },
  assetUrl?: string
) => {
  try {
    const {subjectUrl, chapterId, topicUrl} = contentUrls
    const [subject, topic] = await Promise.all([findSubject(subjectUrl), findTopic(topicUrl)])
    return await prisma.aiDoubts.create({
      data: {
        userId,
        question,
        answer,
        history,
        assetUrl,
        subjectId: subjectUrl? subject?.id : null,
        chapterId: chapterId ? chapterId : null,
        topicId: topicUrl ? topic?.id : null,
        deleteStatus: 0,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const getDoubtModuleHistory = async (
  userId: number,
  subjectUrl?: string | null,
  chapterUrl?: string | null,
  topicUrl?: string | null
) => {
  try {
    return await prisma.aiDoubts.findMany({
      where : {
        userId, deleteStatus: 0,
        ...( subjectUrl ? { subjects: { shortUrl: subjectUrl }} : { subjectId: null }),
        ...( chapterUrl ? { chapters: { shortUrl: chapterUrl }} : { chapterId: null }),
        ...( topicUrl ? { topics: { shortUrl: topicUrl }} : { topicId: null }),
      }
    })
  } catch (error) {
    throw error;
  }
};

export const getTokenDetails = async (userId: number) => {
  try {
    return prisma.tokens.findFirst({ where: { userId } });
  } catch (error) {
    throw error;
  }
};

export const updateTokenDetails = async (
  tokenId: number,
  userId: number,
  remainingTokens: number
) => {
  try {
    return prisma.tokens.update({
      where: { id: tokenId, userId },
      data: { remainingTokens: remainingTokens - 1 },
    });
  } catch (error) {
    throw error;
  }
};

export const getPrompts = async (
  botType: number,
  subjectUrl?: string | null,
  chapterUrl?: string | null,
  topicUrl?: string | null
) => {
  try {
    return await prisma.prompts.findMany({
      where: {
        ...( subjectUrl ? { subjects: { shortUrl: subjectUrl }} : { subjectId: null }),
        ...( chapterUrl ? { chapters: { shortUrl: chapterUrl }} : { chapterId: null }),
        ...( topicUrl ? { topics: { shortUrl: topicUrl }} : { topicId: null }),
        status: 1,
        delete_status: 0,
        botType,
      },
      select: { id: true, prompt: true },
    });
  } catch (error) {
    throw error;
  }
};

export const askCommonDoubts = async (message:string, history?:string, url?:string) => {
  try {
    const result = await customFetch(
      `${AI_BASE_URL}/${Api_endpoint.ai_common_neet_doubts}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message, history, url
        }),
      })
    return {
      result: result?.result,
      history: result?.data,
      success: true,
      detail: result?.detail,
    };
  } catch (error) {
    throw error
  }
};

export const findChapter = async (shortUrl:string) => {
  try {
    return prisma.chapters.findFirst({ where : { shortUrl, deleteStatus: 0, status: 1 }})
  } catch (error) {
    throw error;
  }
};

export const resetAiDoubtsChats = async (userId:number, subjectUrl?:string | null, chapterUrl?:string| null, topicUrl?:string | null) => {
  try {
    return await prisma.aiDoubts.updateMany({
      where: {
        ...( subjectUrl ? { subjects: { shortUrl: subjectUrl }} : { subjectId: null }),
        ...( chapterUrl ? { chapters: { shortUrl: chapterUrl }} : { chapterId: null }),
        ...( topicUrl ? { topics: { shortUrl: topicUrl }} : { topicId: null }),
        userId,
        deleteStatus: 0
      } , data: { deleteStatus: 1 }
    });
  } catch (error) {
    throw error
  }
};

export const findUserTokens = (userId:number) => {
  try {
    return prisma.tokens.findFirst({where: {userId}})
  } catch (error) {
    throw error
  }
}
