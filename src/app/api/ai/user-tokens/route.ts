import { NextRequest, NextResponse } from "next/server";
import { findUserTokens } from "../query";
import { decodeJwt } from "@/utils";
import { ERROR } from "@/types/enums";

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
    const tokens = await findUserTokens(decodedData.id);
    return NextResponse.json({ success: true, data: tokens });
  } catch (error) {
    return NextResponse.json({ success: true, message: error },{ status: 400 });
  }
};
