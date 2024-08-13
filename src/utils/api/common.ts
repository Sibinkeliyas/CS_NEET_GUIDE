import { Api_endpoint } from "@/types/enums"
import axios from "axios"

export const uploadToS3bucket = async (formData: FormData):Promise<{success: boolean, message: string, url?: string, fileName?:string} | undefined> => {
    try {
        const res = await axios.post(`/${Api_endpoint.s3_upload}`, formData)
        return res.data
    } catch (error:any) {
        return {success : false, message : error?.response?.data?.error || "Something went wrong"}
    }
}