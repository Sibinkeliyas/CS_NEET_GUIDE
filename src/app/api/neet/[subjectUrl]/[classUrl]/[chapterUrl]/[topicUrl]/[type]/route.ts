import { NextRequest, NextResponse } from "next/server";
import { getProgressData, postProgressData } from "./query";
import { decodeJwt } from "@/utils";

export const POST = async (
  request: NextRequest,
  route: {
    params: {
      subjectUrl: string;
      classUrl: string;
      chapterUrl: string;
      topicUrl: string;
    };
  }
) => {
  try {
    const { subjectUrl, chapterUrl, topicUrl } = route.params;
    const authToken = request.headers.get("authorization");
    
    if (!authToken || !authToken.startsWith("Bearer"))
      return NextResponse.json(
        {
          success: false,
          message: "Couldn't find authtoken or not a valid token",
        },
        { status: 401 }
      );
    const decodedData: any = decodeJwt(authToken);

    const postProgress = await postProgressData(
      subjectUrl,
      chapterUrl,
      topicUrl,
      decodedData.id
    );
    return NextResponse.json({ success: true, data: postProgress });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error },
      { status: 400 }
    );
  }
};

export const GET = async (
  request: NextRequest,
  route: {
    params: {
      subjectUrl: string;
      classUrl: string;
      chapterUrl: string;
      topicUrl: string;
    };
  }
): Promise<NextResponse> => {
  try {
    const { subjectUrl, chapterUrl, topicUrl } = route.params;
    const authToken = request.headers.get("authorization");
    let decodedData: any
    if (authToken && authToken.startsWith("Bearer")) decodedData = decodeJwt(authToken);
     
    const getProgress = await getProgressData(
      subjectUrl,
      chapterUrl,
      topicUrl,
      decodedData?.id
    );

    return NextResponse.json({ succes: true, data: getProgress });
  } catch (error) {
    
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
};
