import { questions } from "@/app/constants/questions";
import { NextResponse } from "next/server";

interface Props {
  params: Promise<{ subject: string }>;
}

export async function GET(request: Request, { params }: Props) {
  const { subject } = await params;
  const subjectData = questions.find((q) => q.subject === subject);

  if (!subjectData) {
    return NextResponse.json({ error: "Subject not found" }, { status: 404 });
  }

  return NextResponse.json(subjectData);
}
