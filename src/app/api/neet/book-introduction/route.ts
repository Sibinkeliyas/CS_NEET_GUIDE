export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { getIntroductionData } from "./query";

export const GET = async () => {
  try {
    const formattedBookDetails = await getIntroductionData()
    return NextResponse.json({ success: true, data: formattedBookDetails });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 400 }
    );
  }
};
