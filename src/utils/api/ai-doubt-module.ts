import { Api_endpoint, ERROR } from "@/types/enums"
import axiosService from "../axios"
import { IAiTokenProps, IChatAiProps, IPrompts } from "@/types/ai"
import axios from "axios"
import { BASE_URL } from "@/config"

export const postAiQuestion = async (data:any):Promise<{success:boolean, message?:string,data?: IChatAiProps, paymentStatus?: boolean}> => {
    try {
        const res = await axiosService.post(`/${Api_endpoint.ai_common_doubt_module}`, data)
        return res.data
    } catch (error:any) {
        return error?.response?.data || {success: false, message: ERROR.SOMETHING_WENT_WRONG}
    }
}

export const postAskAiChapterQuestions = async (data:any):Promise<{success:boolean, message?:string,data?: IChatAiProps, paymentStatus?: boolean}> => {
    try {
        const res = await axiosService.post(`/${Api_endpoint.ai_doubt_module}`, data)
        return res.data
    } catch (error:any) {
        return error?.response?.data || {success: false, message: ERROR.SOMETHING_WENT_WRONG}
    }
}

export const getDoubtModuleAiHistory = async (subjectUrl?:string, chapterUrl?:string, topicUrl?:string):Promise<{success:boolean, message?:string,data?: IChatAiProps[]}> => {
    try {
        const res = await axiosService.get(`/${Api_endpoint.ai_doubt_module}${subjectUrl ? `?subjectUrl=${subjectUrl}` : ''}${chapterUrl ? `&chapterUrl=${chapterUrl}` : ""}${topicUrl ? `&topicUrl=${topicUrl}` : ""}`)
        return res.data
    } catch (error:any) {
        throw error
    }
}

export const getTokenDetails = async ():Promise<{success: boolean, data?:IAiTokenProps, message?:string}> => {
    try {
        const res = await axiosService.get(`${Api_endpoint.ai_user_tokens}`)
        return res.data
    } catch (error:any) {
        throw error
    }
}

export const getUserAiRelatedData = async (subjectUrl?:string, chapterUrl?:string, topicUrl?:string):Promise<{success:boolean, data: {tokenData?: IAiTokenProps, history?: IChatAiProps[]}}> => {
    try {
        const [tokenData, history] = await Promise.all([getTokenDetails(), getDoubtModuleAiHistory(subjectUrl, chapterUrl, topicUrl)])
        return {success: true, data: { tokenData: tokenData.data, history: history.data }}
    } catch (error:any) {
        return error?.response?.data || {success: false, message: ERROR.SOMETHING_WENT_WRONG}
    }
}

export const getCommonAiPrompts = async (botType:number): Promise<{success: boolean, message?:string, data?:IPrompts[]}> => {
    try {
        const res = await fetch(`${BASE_URL}/${Api_endpoint.ai_prompts}?botType=${botType}`, { cache: 'no-store'})
        return res.json()
    } catch (error:any) {
        return error?.response?.data || {success: false, message: ERROR.SOMETHING_WENT_WRONG}
    }
}

export const getTopicWiseAiPromps = async (botType:number, subjectUrl:string, chapterUrl: string, topicUrl:string): Promise<{success: boolean, message?:string, data?:IPrompts[]}> => {
    try {
        return (await axios.get(`${BASE_URL}/${Api_endpoint.ai_prompts}?botType=${botType}&subjectUrl=${subjectUrl}&chapterUrl=${chapterUrl}&topicUrl=${topicUrl}`)).data
    } catch (error:any) {
        return error?.response?.data || {success: false, message: ERROR.SOMETHING_WENT_WRONG}
    }
}

export const getChapterWiseAiPromps = async (botType:number, subjectUrl:string, chapterUrl: string): Promise<{success: boolean, message?:string, data?:IPrompts[]}> => {
    try {
        return (await axios.get(`${BASE_URL}/${Api_endpoint.ai_prompts}?botType=${botType}&subjectUrl=${subjectUrl}&chapterUrl=${chapterUrl}`)).data
    } catch (error:any) {
        return error?.response?.data || {success: false, message: ERROR.SOMETHING_WENT_WRONG}
    }
}

export const putRestChats = async(subjectUrl?:string, chapterUrl?:string, topicUrl?:string): Promise<{success: boolean, message?:string} | undefined> => {
    try {
        return await axiosService.put(`/${Api_endpoint.ai_doubt_module}`, {subjectUrl, chapterUrl, topicUrl})
    } catch (error:any) {
        return error?.response?.data || {success: false, message: ERROR.SOMETHING_WENT_WRONG}
    }
}