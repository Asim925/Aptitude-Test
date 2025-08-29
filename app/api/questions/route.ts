import { questions } from "@/app/constants/questions";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.json(questions);
}
