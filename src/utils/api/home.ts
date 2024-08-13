import { BASE_URL } from "@/config";
import { ISubjectDetailsProps } from "@/types";
import { Api_endpoint } from "@/types/enums";
import axios from "axios";

export const getBookDetails = async (): Promise<
  { success: boolean; data?: ISubjectDetailsProps; message: string } | undefined
> => {
  try {
    const res = await axios.get(`${BASE_URL}/${Api_endpoint.get_books_details}`);
    const jsonBody = await res.data;
    return jsonBody;
  } catch (error: any) {
    return { success: false, message: error?.response?.data };
  }
};
