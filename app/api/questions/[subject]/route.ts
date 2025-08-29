import { questions } from "@/app/constants/questions";
import { NextResponse } from "next/server";

interface Props {
  params: { subject: string };
}

export async function GET(request: Request, { params }: Props) {
  const subjectData = questions.find((q) => q.subject === params.subject);
  if (!subjectData) {
    return NextResponse.json({ error: "Subject not found" }, { status: 404 });
  }
  return NextResponse.json(subjectData);
}
