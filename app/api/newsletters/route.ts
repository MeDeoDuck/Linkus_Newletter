import { NextRequest, NextResponse } from "next/server";
import { getAllNewsletters, createNewsletter } from "@/lib/db";

const SITE_PASSWORD = process.env.SITE_PASSWORD || "linkus_2026";

export async function GET() {
  try {
    const newsletters = await getAllNewsletters();
    return NextResponse.json(newsletters);
  } catch (error) {
    console.error("Error fetching newsletters:", error);
    return NextResponse.json(
      { error: "뉴스레터 목록을 불러올 수 없습니다." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, author, content, password } = body;

    if (!password || password !== SITE_PASSWORD) {
      return NextResponse.json(
        { error: "비밀번호가 올바르지 않습니다." },
        { status: 401 }
      );
    }

    if (!title || !author || !content) {
      return NextResponse.json(
        { error: "필수 필드가 누락되었습니다." },
        { status: 400 }
      );
    }

    const newsletter = await createNewsletter(title, author, content);
    return NextResponse.json(newsletter, { status: 201 });
  } catch (error) {
    console.error("Error creating newsletter:", error);
    return NextResponse.json(
      { error: "뉴스레터 작성에 실패했습니다." },
      { status: 500 }
    );
  }
}
