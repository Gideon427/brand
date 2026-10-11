import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  // TODO: validate, store in DB, send email, etc.
  console.log("Project submission:", body);

  return NextResponse.json({ ok: true });
}