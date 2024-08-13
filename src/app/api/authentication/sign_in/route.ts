import { NextRequest, NextResponse } from "next/server";
import { findExistingUser, generateOtp, updateUserOtp } from "../query";

export const GET = async (request: NextRequest) => {
  try {
    const params = request.nextUrl.searchParams;
    const phone = params.get("phone");
    if (phone) {
      const isUserExist = await findExistingUser("", phone);
      if (isUserExist) {
        const { otpNumber } = await generateOtp(Number(isUserExist.phone));
        await updateUserOtp(isUserExist.id, otpNumber);
        return NextResponse.json({
          success: true,
          message: "Otp generated successfully",
        });
      } else {
        return NextResponse.json(
          { success: false, message: "You haven't registered yet. Please sign up first to proceed." },
          { status: 401 }
        );
      }
    }
    return NextResponse.json(
      { success: false, message: "Couldn't find Mobile no" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error },
      { status: 400 }
    );
  }
};
