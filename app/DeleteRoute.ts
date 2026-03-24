import { NextRequest, NextResponse } from "next/server";
import { getNewsletterById, deleteNewsletter } from "@/app/db";

const SITE_PASSWORD = process.env.SITE_PASSWORD || "linkus_2026";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const newsletter = getNewsletterById(parseInt(params.id));
    if (!newsletter) {
      return NextResponse.json(
        { error: "뉴스레터를 찾을 수 없습니다." },
        { status: 404 }
      );
    }
    return NextResponse.json(newsletter);
  } catch (error) {
    console.error("Error fetching newsletter:", error);
    return NextResponse.json(
      { error: "뉴스레터를 불러올 수 없습니다." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password || password !== SITE_PASSWORD) {
      return NextResponse.json(
        { error: "비밀번호가 올바르지 않습니다." },
        { status: 401 }
      );
    }

    const success = deleteNewsletter(parseInt(params.id));
    if (!success) {
      return NextResponse.json(
        { error: "뉴스레터를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting newsletter:", error);
    return NextResponse.json(
      { error: "뉴스레터 삭제에 실패했습니다." },
      { status: 500 }
    );
  }
}
