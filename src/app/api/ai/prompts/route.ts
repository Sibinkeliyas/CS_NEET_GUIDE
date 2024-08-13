export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import { getPrompts } from "../query";

export const GET = async (request:NextRequest) => {
    const [] = []
    try {
        const searchParams = request.nextUrl.searchParams;
        const [botType, subjectUrl, chapterUrl, topicUrl] = [
            searchParams.get("botType"),
            searchParams.get("subjectUrl"),
            searchParams.get("chapterUrl"),
            searchParams.get("topicUrl"),
        ];
        const prompts = await getPrompts(Number(botType) || 1, subjectUrl, chapterUrl, topicUrl)
        return NextResponse.json({success: true, data: prompts})
    } catch (error) {
        return NextResponse.json({success: false, message: error}, {status :400})
    }
}