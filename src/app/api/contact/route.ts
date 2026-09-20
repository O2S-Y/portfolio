import { NextResponse } from "next/server";
import { Resend } from "resend";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// In-memory rate limiting: max 3 requests per 5 minutes per IP
const ipRateLimit = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 3;

export async function POST(request: Request) {
  try {
    // 0. Rate limiting check
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";
    const now = Date.now();

    const record = ipRateLimit.get(ip);
    if (record) {
      if (now > record.resetTime) {
        ipRateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
      } else if (record.count >= MAX_REQUESTS_PER_WINDOW) {
        const waitMinutes = Math.ceil((record.resetTime - now) / 60000);
        return NextResponse.json(
          {
            error: `Too many messages sent. Please wait ${waitMinutes} minute${
              waitMinutes > 1 ? "s" : ""
            } before sending another message.`,
          },
          { status: 429 }
        );
      } else {
        record.count += 1;
      }
    } else {
      ipRateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    }

    const body = await request.json();
    const { name, email, message } = body;

    // 1. Validate inputs server-side
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { error: "Message must be at least 10 characters." },
        { status: 400 }
      );
    }

    if (message.length > 1000) {
      return NextResponse.json(
        { error: "Message cannot exceed 1000 characters." },
        { status: 400 }
      );
    }

    // 2. Verify server-side configuration
    const apiKey = process.env.RESEND_API_KEY?.trim();
    if (!apiKey) {
      console.error("RESEND_API_KEY environment variable is not configured.");
      return NextResponse.json(
        {
          error:
            "Email service is not yet configured with RESEND_API_KEY in .env.local.",
        },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const toAddress = "oussamayinssi@gmail.com";
    const fromAddress =
      process.env.RESEND_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: [toAddress],
      replyTo: email.trim(),
      subject: `Portfolio inquiry from ${name.trim()}`,
      text: `Name: ${name.trim()}\nEmail: ${email.trim()}\n\nMessage:\n${message.trim()}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1a1a1a;">
          <h2 style="font-size: 20px; font-weight: 600; margin-bottom: 24px; border-bottom: 1px solid #dadada; padding-bottom: 12px;">
            New Portfolio Message
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 8px 0; color: #767676; width: 80px; text-transform: uppercase; font-size: 13px; letter-spacing: 0.05em;">Name</td>
              <td style="padding: 8px 0; font-size: 16px; color: #1a1a1a;">${escapeHtml(name.trim())}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #767676; width: 80px; text-transform: uppercase; font-size: 13px; letter-spacing: 0.05em;">Email</td>
              <td style="padding: 8px 0; font-size: 16px; color: #1a1a1a;">
                <a href="mailto:${escapeHtml(email.trim())}" style="color: #1a1a1a; text-decoration: underline;">${escapeHtml(email.trim())}</a>
              </td>
            </tr>
          </table>
          <div style="padding-top: 12px; border-top: 1px solid #dadada;">
            <p style="text-transform: uppercase; font-size: 13px; letter-spacing: 0.05em; color: #767676; margin-bottom: 8px;">Message</p>
            <div style="background: #f7f8f7; padding: 16px; font-size: 15px; line-height: 1.6; border-left: 2px solid #1a1a1a; white-space: pre-wrap;">${escapeHtml(message.trim())}</div>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend delivery error:", error);
      return NextResponse.json(
        { error: error.message || "Failed to send email via Resend." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      id: data?.id,
      message: "Email sent successfully.",
    });
  } catch (err: any) {
    console.error("Contact route unexpected error:", err);
    return NextResponse.json(
      { error: err?.message || "Internal server error." },
      { status: 500 }
    );
  }
}
