import { NextResponse } from "next/server";

/** Health check for the OpsCrew deploy workflow: answers 200 while the app is up. */
export function GET() {
  return NextResponse.json({ status: "ok" });
}
