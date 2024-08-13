import prisma from "@/lib/prisma"
import { INcertProps } from "@/types/ncert";

export const getRevisionData = async (subjectUrl:string, chapterUrl:string, classUrl:string | null) => {
    try {
        const content:INcertProps[] = await prisma.$queryRaw`SELECT study_notes.s_no AS id, study_notes.s_id AS subjectId, study_notes.c_id AS chapterId, study_notes.content AS content FROM study_notes
          LEFT JOIN subjects ON study_notes.s_id = subjects.s_no
          LEFT JOIN chapters ON study_notes.c_id = chapters.s_no
          LEFT JOIN classes ON chapters.class_id = classes.s_no
          WHERE  study_notes.status = 1 
          AND study_notes.is_deleted = 0 
          AND subjects.short_url = ${subjectUrl} 
          AND chapters.short_url = ${chapterUrl}
          AND classes.short_url = ${classUrl} `
    
        return {...content[0], content: content[0]?.content ? Buffer.from(content[0].content).toString("utf-8") : ""};
      } catch (error) {
        throw error;
      }
}