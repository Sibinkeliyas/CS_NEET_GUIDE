import { NextResponse } from "next/server"
import { phonePeInitialization } from "../query"
import { ERROR } from "@/types/enums";
import { decodeJwt } from "@/utils";

export const POST = async (request:Request) => {
    try {
        const authToken = request.headers.get("authorization");
        if (!authToken || !authToken.startsWith("Bearer"))
          return NextResponse.json({ success: false, message: ERROR.NOT_A_VALID_USER }, { status: 401 });
        const decodedData: any = decodeJwt(authToken);
        const bodyData = await request.json();
        await phonePeInitialization({ ...bodyData, userId: decodedData.id})
        return NextResponse.json({success: true, message: "Payment Initialized"})
    } catch (error) { 
        return NextResponse.json({success: false, message: error})
    }
}