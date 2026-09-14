import nodemailer from "nodemailer";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { buildEnquiryEmail, FIELD_LABELS, SOURCE_LABELS } from "../../lib/enquiryEmail";

export const runtime = "nodejs";

const MAX_REQUEST_BYTES = 20_000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const LOGO_PATH = join(process.cwd(), "app", "asset", "satyendra-imperial-logo.png");
type RateEntry = { count: number; expiresAt: number };
type EnquiryBody = { source?: unknown; fields?: unknown; website?: unknown };
const globalRateLimit = globalThis as typeof globalThis & {
  imperialEnquiryRateLimit?: Map<string, RateEntry>;
};
const rateLimitStore = globalRateLimit.imperialEnquiryRateLimit ?? new Map<string, RateEntry>();
if (process.env.NODE_ENV !== "production") globalRateLimit.imperialEnquiryRateLimit = rateLimitStore;

function json(data: object, status = 200) {
  return Response.json(data, { status, headers: { "Cache-Control": "no-store" } });
}
function cleanValue(value: unknown, maxLength = 1_000) {
  if (typeof value !== "string") return "";
  return value.replace(/\0/g, "").trim().slice(0, maxLength);
}
function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
function isRateLimited(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip");
  if (!ip) return false;
  const now = Date.now();
  const current = rateLimitStore.get(ip);
  if (!current || current.expiresAt <= now) {
    rateLimitStore.set(ip, { count: 1, expiresAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  current.count += 1;
  return current.count > RATE_LIMIT_MAX;
}
function hasSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!origin || !host) return true;
  try { return new URL(origin).host === host; } catch { return false; }
}

export async function POST(request: Request) {
  if (!hasSameOrigin(request)) return json({ ok: false, error: "This request is not allowed." }, 403);
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_REQUEST_BYTES) return json({ ok: false, error: "The enquiry is too long." }, 413);
  if (isRateLimited(request)) {
    return json({ ok: false, error: "Too many enquiries were sent. Please wait a few minutes and try again." }, 429);
  }

  let body: EnquiryBody;
  try { body = (await request.json()) as EnquiryBody; }
  catch { return json({ ok: false, error: "Please check the form and try again." }, 400); }

  // A filled hidden field normally indicates an automated spam submission.
  if (cleanValue(body.website, 200)) return json({ ok: true });
  const source = cleanValue(body.source, 30);
  if (!SOURCE_LABELS[source] || !body.fields || typeof body.fields !== "object") {
    return json({ ok: false, error: "Please check the form and try again." }, 400);
  }

  const submittedFields = body.fields as Record<string, unknown>;
  const fields = Object.fromEntries(
    Object.keys(FIELD_LABELS)
      .map((key) => [key, cleanValue(submittedFields[key], key === "message" ? 2_000 : 200)])
      .filter(([, value]) => Boolean(value)),
  ) as Record<string, string>;
  if (!fields.name || !fields.phone) {
    return json({ ok: false, error: "Please enter your name and phone number." }, 400);
  }
  const phoneDigits = fields.phone.replace(/\D/g, "");
  if (!/^[6-9]\d{9}$/.test(phoneDigits)) {
    return json({ ok: false, error: "Please enter a valid 10-digit Indian mobile number." }, 400);
  }
  fields.phone = `+91 ${phoneDigits.slice(0, 5)} ${phoneDigits.slice(5)}`;
  if (fields.email && !isValidEmail(fields.email)) {
    return json({ ok: false, error: "Please enter a valid email address." }, 400);
  }

  const smtpHost = process.env.SMTP_HOST?.trim();
  const smtpPort = Number(process.env.SMTP_PORT || 587);
  const smtpUser = process.env.SMTP_USER?.trim();
  const smtpPass = process.env.SMTP_PASS?.replace(/\s+/g, "");
  const adminEmail = process.env.IMPERIAL_SATYENDRA_ADMIN?.trim();
  const from = process.env.EMAIL_FROM?.trim() || smtpUser;
  if (!smtpHost || !smtpUser || !smtpPass || !adminEmail || !from || !Number.isFinite(smtpPort)) {
    console.error("Imperial Satyendra enquiry email configuration is incomplete.");
    return json({ ok: false, error: "Email service is not ready. Please contact Imperial Satyendra directly." }, 503);
  }

  try {
    const logo = await readFile(LOGO_PATH);
    const emailTemplate = buildEnquiryEmail({
      source,
      fields,
      logoUrl: "cid:imperial-satyendra-logo",
    });
    const transporter = nodemailer.createTransport({
      host: smtpHost, port: smtpPort, secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass },
    });
    await transporter.sendMail({
      from, to: adminEmail,
      replyTo: fields.email && isValidEmail(fields.email) ? fields.email : undefined,
      subject: emailTemplate.subject,
      text: emailTemplate.text,
      html: emailTemplate.html,
      attachments: [{
        filename: "imperial-satyendra-logo.png",
        content: logo,
        cid: "imperial-satyendra-logo",
        contentDisposition: "inline",
      }],
    });
    return json({ ok: true });
  } catch (error) {
    console.error("Imperial Satyendra enquiry email failed:", error instanceof Error ? error.message : "Unknown email error");
    return json({ ok: false, error: "We could not send your enquiry. Please try again in a few minutes." }, 500);
  }
}

export async function GET() {
  if (process.env.NODE_ENV === "production") return new Response(null, { status: 404 });
  const logo = await readFile(LOGO_PATH);
  const preview = buildEnquiryEmail({
    source: "home",
    logoUrl: `data:image/png;base64,${logo.toString("base64")}`,
    receivedAt: new Date("2026-09-14T05:30:00.000Z"),
    fields: {
      name: "Rahul Kumar",
      phone: "+91 98765 43210",
      email: "guest@example.com",
      interest: "A wedding or celebration",
      message: "I want to book a date for my wedding.",
    },
  });
  return new Response(preview.html, {
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  });
}
