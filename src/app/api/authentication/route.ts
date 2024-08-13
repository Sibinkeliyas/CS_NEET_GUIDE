import { NextRequest, NextResponse } from "next/server";
import { decodeJwt } from "@/utils";
import { createUser, findExistingUser, generateOtp } from "./query";

export const GET = async (request: NextRequest) => {
  try {
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
    const user = await findExistingUser("", decodedData.phone);
    return NextResponse.json({ success: true, data: {id: user?.id, name: user?.name, email: user?.email, phone: user?.phone} });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error },
      { status: 400 }
    );
  }
};

export const POST = async (request: Request) => {
  try {
    const userData = await request.json();

    const isUserExist = await findExistingUser(userData.email, userData.phone);
    if (isUserExist)
      return Response.json(
        {
          status: false,
          message: `${
            isUserExist.email === userData.email ? "Email" : "Phone No"
          } already exist`,
        },
        { status: 409 }
      );
    const { otpNumber } = await generateOtp(userData.phone);
    await createUser({ ...userData, otp: otpNumber });
    return NextResponse.json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error },
      { status: 400 }
    );
  }
};
