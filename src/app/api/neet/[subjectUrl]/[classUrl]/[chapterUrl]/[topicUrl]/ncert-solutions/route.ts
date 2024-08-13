import { NextRequest, NextResponse } from "next/server";
import { getNcertSolutions } from "./query";

export const GET = async (
  request: NextRequest,
  route: { params: { subjectUrl: string, classUrl: string, chapterUrl: string, topicUrl: string }}) => {
  try {
    const {subjectUrl, classUrl, chapterUrl, topicUrl} = route.params
    const ncertSolutions = await getNcertSolutions(subjectUrl, classUrl, chapterUrl, topicUrl);
    return NextResponse.json({ success: true, data: ncertSolutions, });
  } catch (error) {
    return NextResponse.json({ success: false, message: error },{ status: 400 });
  }
};
