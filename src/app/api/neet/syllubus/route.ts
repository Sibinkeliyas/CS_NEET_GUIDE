export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { getSyllabus } from "./query";

export const GET = async () => {
  try {
    const syllabus = await getSyllabus()
    return NextResponse.json({ success: true, data: syllabus });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 400 }
    );
  }
};
