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

let cachedTransporter: nodemailer.Transporter | null = null;
function getTransporter() {
  if (!cachedTransporter) {
    cachedTransporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      pool: true,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });
  }
  return cachedTransporter;
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

  if (SMTP_PASS === "ENTER_YOUR_APP_PASSWORD_HERE") {
    console.warn("[contact] User has not entered a real Gmail App Password yet.");
    return NextResponse.json(
      { ok: false, error: "Setup Required: Please open .env.local and replace ENTER_YOUR_APP_PASSWORD_HERE with your 16-letter Gmail App Password." },
      { status: 401 },
    );
  }

  if (!hasMailConfig()) {
    console.warn("[contact] Missing SMTP configuration. Running in mock mode. Message was not delivered.");
    console.log(`[contact/mock] Received message from ${name} (${email}): ${message.slice(0, 50)}...`);
    return NextResponse.json({ ok: true, mock: true });
  }

  const safeName = sanitizeHeaderValue(name);
  const safeEmail = sanitizeHeaderValue(email);
  const safeMessage = message.trim();

  try {
    const transporter = getTransporter();

    // Fire and forget instantly. The frontend will not be blocked waiting for Gmail SMTP TLS handshakes.
    transporter.sendMail({
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
    }).then(() => {
      console.log(`[contact] Background delivery successful for ${safeEmail}`);
    }).catch((error) => {
      console.error("[contact] Background email delivery failed:", error);
    });
  } catch (error) {
    console.error("[contact] Failed to initialize transporter", error);
    return NextResponse.json(
      { ok: false, error: "Unable to process message right now. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
