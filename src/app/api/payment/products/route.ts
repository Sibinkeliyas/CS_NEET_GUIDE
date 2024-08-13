import { NextResponse } from "next/server";
import { getProducts } from "../query";

export const GET = async () => {
  try {
    const products = await getProducts();
    return NextResponse.json({ succuss: true, data: products });
  } catch (error) {
    return NextResponse.json({ success: false, message: error });
  }
};
