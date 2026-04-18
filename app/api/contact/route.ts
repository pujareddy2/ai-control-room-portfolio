import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
};

export async function POST(req: Request) {
  let payload: ContactPayload = {};
  try {
    payload = (await req.json()) as ContactPayload;
  } catch {
    payload = {};
  }

  const name = (payload.name ?? "").trim();
  const email = (payload.email ?? "").trim();
  const message = (payload.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Name, email, and message are required." },
      { status: 400 },
    );
  }

  if (name.length > 120 || email.length > 200 || message.length > 5000) {
    return NextResponse.json(
      { ok: false, error: "Message too long." },
      { status: 400 },
    );
  }

  // Vercel-compatible: store the submission in logs.
  console.log("[puja-ai-system:contact]", {
    name,
    email,
    message,
    userAgent: req.headers.get("user-agent"),
    time: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
