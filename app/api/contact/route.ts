import { NextResponse } from "next/server";

type ContactPayload = {
  name: string;
  category: string;
  email: string;
  phone: string;
  job: string;
  company: string;
  city: string;
  country: string;
  subject: string;
  message: string;
  locale: "id" | "en";
};

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function validate(payload: Partial<ContactPayload>): string | null {
  const requiredFields: Array<keyof ContactPayload> = [
    "name",
    "category",
    "email",
    "phone",
    "job",
    "company",
    "city",
    "country",
    "subject",
    "message",
    "locale",
  ];

  for (const field of requiredFields) {
    if (!payload[field] || String(payload[field]).trim().length === 0) {
      return `Field wajib tidak lengkap: ${field}`;
    }
  }

  const email = String(payload.email ?? "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Format email tidak valid.";
  }

  return null;
}

function buildHtmlEmail(payload: ContactPayload): string {
  const submittedAt = new Date().toLocaleString("id-ID", {
    dateStyle: "full",
    timeStyle: "medium",
    timeZone: "Asia/Jakarta",
  });

  return `
    <div style="font-family: Arial, Helvetica, sans-serif; color: #0f172a; background:#f8fafc; padding:24px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 760px; margin: 0 auto; background:#ffffff; border:1px solid #e2e8f0; border-collapse: collapse;">
        <tr>
          <td style="padding:24px 28px; border-bottom:1px solid #e2e8f0; background:#0b2545; color:#ffffff;">
            <h2 style="margin:0; font-size:18px; letter-spacing:0.3px;">Adibayu Group — Contact Form Submission</h2>
            <p style="margin:8px 0 0 0; font-size:12px; opacity:0.9;">Submitted at ${esc(submittedAt)}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 28px;">
            <h3 style="margin:0 0 14px 0; font-size:15px; color:#0b2545;">Contact Profile</h3>
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; font-size:14px;">
              <tr><td style="padding:8px 0; color:#475569; width:180px;">Name</td><td style="padding:8px 0;"><strong>${esc(payload.name)}</strong></td></tr>
              <tr><td style="padding:8px 0; color:#475569;">Email</td><td style="padding:8px 0;"><a href="mailto:${esc(payload.email)}">${esc(payload.email)}</a></td></tr>
              <tr><td style="padding:8px 0; color:#475569;">Phone</td><td style="padding:8px 0;">${esc(payload.phone)}</td></tr>
              <tr><td style="padding:8px 0; color:#475569;">Company</td><td style="padding:8px 0;">${esc(payload.company)}</td></tr>
              <tr><td style="padding:8px 0; color:#475569;">Job Function</td><td style="padding:8px 0;">${esc(payload.job)}</td></tr>
              <tr><td style="padding:8px 0; color:#475569;">City / Country</td><td style="padding:8px 0;">${esc(payload.city)} / ${esc(payload.country)}</td></tr>
            </table>

            <h3 style="margin:24px 0 14px 0; font-size:15px; color:#0b2545;">Inquiry</h3>
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; font-size:14px;">
              <tr><td style="padding:8px 0; color:#475569; width:180px;">Category</td><td style="padding:8px 0;">${esc(payload.category)}</td></tr>
              <tr><td style="padding:8px 0; color:#475569;">Subject</td><td style="padding:8px 0;"><strong>${esc(payload.subject)}</strong></td></tr>
            </table>

            <div style="margin-top:14px; padding:14px; border:1px solid #e2e8f0; background:#f8fafc; white-space:pre-wrap; line-height:1.6;">${esc(payload.message)}</div>
          </td>
        </tr>
      </table>
    </div>
  `;
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { message: "Payload tidak valid." },
      { status: 400 },
    );
  }

  const validationError = validate(payload);
  if (validationError) {
    return NextResponse.json({ message: validationError }, { status: 400 });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const sendgridApiKey = process.env.SENDGRID_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || "office@adibayu.com";
  const from = process.env.CONTACT_FROM_EMAIL || "no-reply@adibayu.com";

  if (!resendApiKey && !sendgridApiKey) {
    return NextResponse.json(
      {
        message:
          "Email service belum dikonfigurasi. Set RESEND_API_KEY atau SENDGRID_API_KEY terlebih dahulu.",
      },
      { status: 500 },
    );
  }

  const subjectPrefix =
    payload.locale === "id" ? "Kontak Website" : "Website Contact";
  const subject = `[${subjectPrefix}] ${payload.subject}`;

  const plainText = `${payload.name} (${payload.email})\n${payload.company}\n${payload.city}, ${payload.country}\n\nSubject: ${payload.subject}\nCategory: ${payload.category}\n\n${payload.message}`;

  if (sendgridApiKey) {
    const sendgridResponse = await fetch(
      "https://api.sendgrid.com/v3/mail/send",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sendgridApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: to }] }],
          from: { email: from },
          reply_to: { email: payload.email },
          subject,
          content: [
            { type: "text/plain", value: plainText },
            { type: "text/html", value: buildHtmlEmail(payload) },
          ],
        }),
      },
    );

    if (!sendgridResponse.ok) {
      const detail = await sendgridResponse.text();
      return NextResponse.json(
        {
          message: "Gagal mengirim email kontak (SendGrid).",
          detail,
        },
        { status: 502 },
      );
    }
  } else if (resendApiKey) {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        subject,
        reply_to: payload.email,
        html: buildHtmlEmail(payload),
        text: plainText,
      }),
    });

    if (!resendResponse.ok) {
      const detail = await resendResponse.text();
      return NextResponse.json(
        {
          message: "Gagal mengirim email kontak (Resend).",
          detail,
        },
        { status: 502 },
      );
    }
  }

  return NextResponse.json({
    message:
      payload.locale === "id"
        ? "Pesan berhasil dikirim. Tim kami akan segera menghubungi Anda."
        : "Message sent successfully. Our team will contact you soon.",
  });
}
