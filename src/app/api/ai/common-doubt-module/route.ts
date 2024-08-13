import { decodeJwt } from "@/utils";
import { NextResponse } from "next/server";
import {
  askCommonDoubts,
  getTokenDetails,
  insertDoubtModuleHistory,
  updateTokenDetails,
} from "../query";
import { AI, ERROR } from "@/types/enums";

export const POST = async (request: Request) => {
  try {
    const authToken = request.headers.get("authorization");
    if (!authToken || !authToken.startsWith("Bearer"))
      return NextResponse.json({ success: false, message: ERROR.NOT_A_VALID_USER }, { status: 401 });

    const decodedData: any = decodeJwt(authToken);
    const { message, history, assetUrl } = await request.json();
    const tokenDetails = await getTokenDetails(decodedData.id);

    if (!tokenDetails?.remainingTokens || tokenDetails?.remainingTokens === 0) {
      return NextResponse.json({ success: false, paymentStatus: false, message: ERROR.TOKENS_COMPLETED });
    }

    await updateTokenDetails( tokenDetails.id, decodedData.id, tokenDetails.remainingTokens );

    const result = await askCommonDoubts(message, history, assetUrl);

    const qstHistory = await insertDoubtModuleHistory(
      decodedData.id,
      message,
      result?.result || AI.ERROR_MESSAGE,
      result.history,
      { subjectUrl: "", chapterId: 0, topicUrl: "" },
      assetUrl
    );

    const replyObj = {
      id: qstHistory.id,
      question: message,
      answer: result?.result || AI.ERROR_MESSAGE,
      history: result?.history,
    };
    return NextResponse.json({
      success: true,
      data: replyObj,
      paymentStatus: true,
      result,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      paymentStatus: true,
      message: JSON.stringify(error),
    });
  }
};
