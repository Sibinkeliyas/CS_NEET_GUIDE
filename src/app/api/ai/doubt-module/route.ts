import { NextRequest, NextResponse } from "next/server";
import {
  askQuestion,
  findChapter,
  getDoubtModuleHistory,
  getTokenDetails,
  insertDoubtModuleHistory,
  resetAiDoubtsChats,
  updateTokenDetails,
} from "../query";
import { AI, ERROR, SUCCESS_MESSAGES } from "@/types/enums";
import { decodeJwt } from "@/utils";

export const GET = async (request: NextRequest) => {
  try {
    const authToken = request.headers.get("authorization");
    if (!authToken || !authToken.startsWith("Bearer"))
      return NextResponse.json(
        {
          success: false,
          message: ERROR.NOT_A_VALID_USER,
        },
        { status: 401 }
      );
    const decodedData: any = decodeJwt(authToken);
    const searchParams = request.nextUrl.searchParams;
    const [subjectUrl, chapterUrl, topicUrl] = [
      searchParams.get("subjectUrl"),
      searchParams.get("chapterUrl"),
      searchParams.get("topicUrl"),
    ];

    const result = await getDoubtModuleHistory(
      decodedData.id,
      subjectUrl,
      chapterUrl,
      topicUrl
    );
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: JSON.stringify(error),
    }, { status: 400 });
  }
};

export const POST = async (request: Request) => {
  try {
    const authToken = request.headers.get("authorization");
    if (!authToken || !authToken.startsWith("Bearer"))
      return NextResponse.json({ success: false, message: ERROR.NOT_A_VALID_USER, }, { status: 401 });
    const decodedData: any = decodeJwt(authToken);
    const { message, history, subjectUrl, chapterUrl, topicUrl, assetUrl } = await request.json();
    const tokenDetails = await getTokenDetails(decodedData.id);
    if (!tokenDetails?.remainingTokens || tokenDetails?.remainingTokens === 0) {
      return NextResponse.json({ success: false, paymentStatus: false, message:ERROR.TOKENS_COMPLETED });
    }
    const [chapterData] = await Promise.all([findChapter(chapterUrl), updateTokenDetails(tokenDetails.id, decodedData.id, tokenDetails.remainingTokens)])
    
    const result = await askQuestion(message, chapterData?.chapterName, history, assetUrl);
    const qstHistory = await insertDoubtModuleHistory(
      decodedData.id,
      message,
      result?.result || AI.ERROR_MESSAGE,
      result.history,
      { subjectUrl, chapterId: chapterData?.id || 0, topicUrl },
      assetUrl
    );
    return NextResponse.json({ 
      success: true,
      data: { id: qstHistory.id, question: message, answer: result?.result || AI.ERROR_MESSAGE, history: result?.history, },
      paymentStatus: true,
      result
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      paymentStatus: true,
      message: JSON.stringify(error),
    });
  }
};

export const PUT = async (request:Request) => {
  try {
    const authToken = request.headers.get("authorization");
    if (!authToken || !authToken.startsWith("Bearer"))
      return NextResponse.json({ success: false, message: ERROR.NOT_A_VALID_USER, }, { status: 401 });
    const decodedData: any = decodeJwt(authToken);
    const { subjectUrl, chapterUrl, topicUrl } = await request.json();
    await resetAiDoubtsChats(decodedData.id, subjectUrl, chapterUrl, topicUrl)
    return NextResponse.json({ success: true, message: SUCCESS_MESSAGES.UPDATE });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: JSON.stringify(error),
    }, { status: 400 });
  }
}
