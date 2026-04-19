import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
};

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT ?? "587");
const SMTP_SECURE = process.env.SMTP_SECURE === "true";
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL;
const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL;

function hasMailConfig() {
  return Boolean(SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS && CONTACT_TO_EMAIL);
}

function sanitizeHeaderValue(value: string) {
  return value.replace(/[\r\n]/g, " ").trim();
}

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

  if (!hasMailConfig()) {
    console.error("[contact] Missing SMTP configuration.");
    return NextResponse.json(
      { ok: false, error: "Contact service is not configured yet." },
      { status: 500 },
    );
  }

  const safeName = sanitizeHeaderValue(name);
  const safeEmail = sanitizeHeaderValue(email);
  const safeMessage = message.trim();

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: CONTACT_FROM_EMAIL || SMTP_USER,
      to: CONTACT_TO_EMAIL,
      replyTo: safeEmail,
      subject: `Portfolio Contact: ${safeName}`,
      text: [
        `Name: ${safeName}`,
        `Email: ${safeEmail}`,
        "",
        "Message:",
        safeMessage,
        "",
        `User-Agent: ${req.headers.get("user-agent") || "unknown"}`,
        `Time: ${new Date().toISOString()}`,
      ].join("\n"),
    });
  } catch (error) {
    console.error("[contact] Failed to send email", error);
    return NextResponse.json(
      { ok: false, error: "Unable to send message right now. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
