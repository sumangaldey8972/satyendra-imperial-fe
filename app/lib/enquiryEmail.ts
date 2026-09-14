export const FIELD_LABELS: Record<string, string> = {
  name: "Name",
  phone: "Phone number",
  email: "Email address",
  interest: "Planning for",
  arrival: "Arrival date",
  guests: "Number of guests",
  stayType: "Reason for stay",
  date: "Preferred date",
  eventType: "Event type",
  time: "Preferred time",
  meal: "Meal",
  message: "Guest message",
};

export const SOURCE_LABELS: Record<string, string> = {
  home: "Website enquiry",
  stay: "Room enquiry",
  celebrate: "Celebration enquiry",
  dine: "Table reservation",
  gallery: "Gallery enquiry",
};

type EmailTemplateInput = {
  source: string;
  fields: Record<string, string>;
  logoUrl: string;
  receivedAt?: Date;
};

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]!,
  );
}

function getEnquiryHeading(source: string, fields: Record<string, string>) {
  const context = `${fields.interest ?? ""} ${fields.eventType ?? ""}`.toLowerCase();
  if (context.includes("wedding") || source === "celebrate") return "Wedding enquiry";
  if (source === "stay") return "Room enquiry";
  if (source === "dine") return "Table reservation";
  return SOURCE_LABELS[source] ?? "Website enquiry";
}

function formatReceivedAt(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  }).format(date);
}

export function buildEnquiryEmail({ source, fields, logoUrl, receivedAt = new Date() }: EmailTemplateInput) {
  const heading = getEnquiryHeading(source, fields);
  const sourceLabel = SOURCE_LABELS[source] ?? "Website enquiry";
  const name = fields.name || "Website guest";
  const phone = fields.phone || "Not provided";
  const phoneHref = `tel:${phone.replace(/[^+\d]/g, "")}`;
  const email = fields.email;
  const message = fields.message;
  const received = formatReceivedAt(receivedAt);
  const detailRows = Object.entries(fields)
    .filter(([key]) => !["name", "phone", "email", "message"].includes(key))
    .map(([key, value]) => `
      <tr>
        <td class="detail-label" style="padding:10px 16px 10px 0;color:#716b61;font-size:11px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;vertical-align:top;width:38%;border-bottom:1px solid #ddd5c7;">${escapeHtml(FIELD_LABELS[key] ?? key)}</td>
        <td style="padding:10px 0;color:#171611;font-size:15px;line-height:1.6;vertical-align:top;border-bottom:1px solid #ddd5c7;">${escapeHtml(value)}</td>
      </tr>`)
    .join("");

  const textRows = Object.entries(fields)
    .map(([key, value]) => `${FIELD_LABELS[key] ?? key}: ${value}`)
    .join("\n");

  const replyButton = email
    ? `<a href="mailto:${escapeHtml(email)}?subject=${encodeURIComponent(`Re: Imperial Satyendra ${heading}`)}" style="display:inline-block;padding:15px 25px;color:#171611;border:1px solid #b9934c;text-decoration:none;font-size:12px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;">Reply by email</a>`
    : "";

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${escapeHtml(heading)} · Imperial Satyendra</title>
  <style>
    @media only screen and (max-width:620px) {
      .email-shell { width:100% !important; }
      .content-pad { padding-left:24px !important; padding-right:24px !important; }
      .guest-name { font-size:38px !important; }
      .phone-number { display:block !important; margin:0 0 16px !important; font-size:25px !important; }
      .action-cell { display:block !important; width:100% !important; text-align:left !important; }
      .detail-label { width:42% !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background:#e9e3d8;font-family:Arial,Helvetica,sans-serif;color:#171611;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#e9e3d8;">
    <tr><td align="center" style="padding:28px 12px;">
      <table role="presentation" class="email-shell" width="680" cellspacing="0" cellpadding="0" border="0" style="width:680px;max-width:100%;background:#fbf8f1;">
        <tr>
          <td style="padding:22px 34px;background:#171611;border-bottom:2px solid #b9934c;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td><img src="${logoUrl}" width="188" alt="Imperial Satyendra" style="display:block;width:188px;max-width:100%;height:auto;border:0;"></td>
                <td align="right" style="color:#d7b468;font-size:11px;font-weight:700;letter-spacing:2.2px;text-transform:uppercase;">${escapeHtml(heading)}</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td class="content-pad" style="padding:44px 48px 18px;">
            <p style="margin:0 0 14px;color:#716b61;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">New website enquiry</p>
            <h1 class="guest-name" style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:52px;font-weight:400;line-height:1.05;letter-spacing:-1px;">${escapeHtml(name)}</h1>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:24px;">
              <tr>
                <td class="action-cell" style="vertical-align:middle;">
                  <a class="phone-number" href="${phoneHref}" style="color:#b08a3f;font-family:Georgia,'Times New Roman',serif;font-size:31px;font-weight:700;text-decoration:none;white-space:nowrap;">${escapeHtml(phone)}</a>
                </td>
                <td class="action-cell" align="right" style="vertical-align:middle;width:168px;">
                  <a href="${phoneHref}" style="display:inline-block;padding:15px 25px;color:#fbf8f1;background:#171611;text-decoration:none;font-size:12px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;">Call now</a>
                </td>
              </tr>
            </table>
            ${email ? `<p style="margin:18px 0 0;font-size:16px;line-height:1.6;"><a href="mailto:${escapeHtml(email)}" style="color:#171611;text-decoration:underline;text-decoration-color:#b9934c;text-underline-offset:4px;">${escapeHtml(email)}</a></p>` : ""}
            <p style="margin:10px 0 0;color:#716b61;font-size:13px;line-height:1.6;">Received ${escapeHtml(received)} IST</p>
          </td>
        </tr>
        <tr>
          <td class="content-pad" style="padding:18px 48px 0;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-top:1px solid #b9934c;">
              <tr>
                <td class="detail-label" style="padding:18px 16px 10px 0;color:#716b61;font-size:11px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;vertical-align:top;width:38%;border-bottom:1px solid #ddd5c7;">Enquiry type</td>
                <td style="padding:18px 0 10px;color:#171611;font-size:15px;line-height:1.6;vertical-align:top;border-bottom:1px solid #ddd5c7;">${escapeHtml(sourceLabel)}</td>
              </tr>
              ${detailRows}
            </table>
          </td>
        </tr>
        ${message ? `<tr>
          <td class="content-pad" style="padding:34px 48px 0;">
            <p style="margin:0 0 10px;color:#716b61;font-size:11px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;">Guest message</p>
            <div style="padding:22px 24px;border:1px solid #d8cdbb;background:#f7f1e6;color:#171611;font-family:Georgia,'Times New Roman',serif;font-size:20px;font-style:italic;line-height:1.55;">“${escapeHtml(message)}”</div>
          </td>
        </tr>` : ""}
        <tr>
          <td class="content-pad" style="padding:34px 48px 44px;">
            ${replyButton}
            <p style="margin:30px 0 0;padding-top:20px;border-top:1px solid #d8cdbb;color:#716b61;font-size:11px;line-height:1.7;text-align:center;">Sent from the Imperial Satyendra website · Patna, Bihar</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  return {
    html,
    text: `${heading}\nNew website enquiry received ${received} IST\n\n${textRows}`,
    subject: `New Imperial Satyendra enquiry — ${heading}`,
  };
}
