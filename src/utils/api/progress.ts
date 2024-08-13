import { Api_endpoint } from "@/types/enums";
import axiosService from "../axios";
import { IProgressDataProps } from "@/types";

export const postProgressData = async (
  subjectId: number,
  chapterId: number,
  topicId: number
): Promise<{ success: boolean; message: string } | undefined> => {
  try {
    const res = await axiosService.post(
      `/${Api_endpoint.postProgress}/${subjectId}/1/${chapterId}/${topicId}/ncert-solution`
    );
    return res.data;
  } catch (error: any) {
    return (
      error?.response?.data || {
        success: false,
        message: "Something went wrong, Please try again later",
      }
    );
  }
};

export const getProgressDetails = async (
  subjectId: string,
  chapterId: string,
  topicId: string,
  classUrl:string
): Promise<{ success: boolean; data?: IProgressDataProps; message: string } | undefined> => {
  try {
    const res = await axiosService.get(
      `/${Api_endpoint.postProgress}/${subjectId}/${classUrl}/${chapterId}/${topicId}/ncert-solution`
    );
    return await res.data;
  } catch (error: any) {
    return { success: false, message: error?.response?.data };
  }
};
