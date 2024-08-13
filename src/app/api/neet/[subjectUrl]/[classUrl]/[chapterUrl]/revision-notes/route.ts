import { NextRequest, NextResponse } from "next/server";
import { getRevisionData } from "./query";

export const GET = async (request: NextRequest, route: { params: { subjectUrl: string, classUrl: string, chapterUrl: string }}) => {
  try {
    const { subjectUrl, chapterUrl, classUrl } = route.params
    const data = await getRevisionData(subjectUrl, chapterUrl, classUrl)
    return NextResponse.json({success: true, data })
  } catch (error) {
    return NextResponse.json({ success: false , message: error}, { status: 400 });
  }
};
