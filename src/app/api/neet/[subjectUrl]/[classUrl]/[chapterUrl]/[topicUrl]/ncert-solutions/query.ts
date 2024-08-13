import prisma from "@/lib/prisma";
import { PageMetaData } from "@/types";
import { INcertProps } from "@/types/ncert";


export const getNcertSolutions = async (
  subjectUrl: string,
  classUrl:string,
  chapterUrl: string,
  topicUrl?: string
) => {
  try {
    const content:INcertProps[] = await prisma.$queryRaw`SELECT ncert_book.s_no AS id, ncert_book.s_id AS subjectId, ncert_book.c_id AS chapterId, ncert_book.t_id AS topicId, ncert_book.content AS content, topics.t_name AS topicName FROM ncert_book
      LEFT JOIN subjects ON ncert_book.s_id = subjects.s_no
      LEFT JOIN chapters ON ncert_book.c_id = chapters.s_no
      LEFT JOIN classes ON chapters.class_id = classes.s_no
      LEFT JOIN topics ON ncert_book.t_id = topics.s_no
      WHERE  ncert_book.status = 1 
      AND ncert_book.is_deleted = 0 
      AND subjects.short_url = ${subjectUrl} 
      AND chapters.short_url = ${chapterUrl}
      AND classes.short_url = ${classUrl} 
      AND topics.short_url = ${topicUrl}`

    return {...content[0], content: content[0]?.content ? Buffer.from(content[0].content).toString("utf-8") : ""};
  } catch (error) {
    throw error;
  }
};

export const getNcertMetaData =async ( subjectUrl: string, classUrl:string, chapterUrl: string, topicUrl?: string) => {
  try {
    const metaData:PageMetaData[] = await prisma.$queryRaw`
        SELECT page_meta_data.* FROM page_meta_data
        LEFT JOIN subjects ON subjects.s_no = page_meta_data.s_id
        LEFT JOIN chapters ON chapters.s_no = page_meta_data.c_id
        LEFT JOIN topics ON topics.s_no = page_meta_data.t_id
        LEFT JOIN classes ON classes.s_no = chapters.class_id
        WHERE subjects.short_url = ${subjectUrl}
          AND classes.short_url = ${classUrl}
          AND chapters.short_url = ${chapterUrl}
          AND topics.short_url = ${topicUrl}
          AND page_id = 1
        LIMIT 1;
        `;
    return metaData[0]
  } catch (error) {
    throw error;
  }
}

export const getRevisionNoteMetaData =async ( subjectUrl: string, classUrl:string, chapterUrl: string) => {
  try {
    const metaData:PageMetaData[] = await prisma.$queryRaw`
        SELECT page_meta_data.* FROM page_meta_data
        LEFT JOIN subjects ON subjects.s_no = page_meta_data.s_id
        LEFT JOIN chapters ON chapters.s_no = page_meta_data.c_id
        LEFT JOIN classes ON classes.s_no = chapters.class_id
        WHERE subjects.short_url = ${subjectUrl}
          AND classes.short_url = ${classUrl}
          AND chapters.short_url = ${chapterUrl}
          AND page_meta_data.t_id = 0
          AND page_id = 2
        LIMIT 1;
        `;
    return metaData[0]
  } catch (error) {
    throw error;
  }
}