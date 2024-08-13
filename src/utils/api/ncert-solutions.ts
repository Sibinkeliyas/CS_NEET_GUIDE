import axios from 'axios';
import { BASE_URL } from '@/config';
import { PageMetaData } from '@/types';
import { Api_endpoint } from '@/types/enums';
import { INcertProps, INcertSidebarProps } from '@/types/ncert';

export const getNcertSolutions = async (subjectUrl:string, classUrl:string, chapterUrl:string, topicUrl:string):Promise<{success: boolean, data?: INcertProps, message: string} | undefined> => {
    try {
        const res = await fetch(`${BASE_URL}/${Api_endpoint.neet}/${subjectUrl}/${classUrl}/${chapterUrl}/${topicUrl}/${Api_endpoint.ncert_solutions}`, { next: { revalidate: 10  }})
        return await res.json()
    } catch (error:any) {
        return {success: false, message: error?.response?.data }
    }
}

export const ncertPageMetaData = async (
  subjectUrl: string,
  classUrl: string,
  chapterUrl: string,
  topicUrl: string
): Promise<{ success: boolean; message?: string; data?: PageMetaData }> => {
  try {
    const res = await axios.get(
      `${BASE_URL}/${Api_endpoint.neet}/${subjectUrl}/${classUrl}/${chapterUrl}/${topicUrl}/${Api_endpoint.ncert_page_metadata}`
    );
    return res.data;
  } catch (error: any) {
    return { success: false, message: error?.response?.data };
  }
};


export const getSyllabus = async ():Promise<{ success: boolean; message?: string; data?: INcertSidebarProps[] } | undefined> => {
  try {
    const res = await fetch(`/${Api_endpoint.get_syllabus}`)
    return await res.json()
  } catch (error:any) {
    return { success: false, message: error?.response?.data };
  }
}