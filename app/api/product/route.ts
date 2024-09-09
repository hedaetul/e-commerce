import { NextResponse } from "next/server";
import product from "./products.json";

export const GET = async () => {
  return NextResponse.json(product);
};
