import { NextRequest, NextResponse } from "next/server";
import { validatingUserOtp } from "../query";
import jwt from "jsonwebtoken";
import { generateJwt } from "@/utils";

// params are phone number and otp
export const GET = async (request: NextRequest) => {
  try {
    const params = request.nextUrl.searchParams;
    const [phone, otp] = [params.get("phone"), params.get("otp")];
    if (phone && otp) {
      const user = await validatingUserOtp(phone, Number(otp));
      
      if (user) {
        const tokenData = {
          id: user.id,
          name: user.name,
          phone: user.phone,
        };
        const accessToken = await generateJwt(tokenData)
        return Response.json({
          success: true,
          message: "Successfully logged",
          data: {
            user: { id: user.id, name: user.name, email: user.email },
            accessToken,
          },
        });
      }
    }
    return NextResponse.json(
      { success: false, message: "Wrong OTP or Mobile no" },
      { status: 401 }
    );
  } catch (error) {
    console.log(error, "error");
    
    return NextResponse.json(
      { success: false, message: error },
      { status: 400 }
    );
  }
};
