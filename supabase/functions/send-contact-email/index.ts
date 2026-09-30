import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const FROM = "Diini Kahiye <no-reply@diinikahiye.online>";
const OWNER = "diiniyare74@gmail.com";

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const r = rateLimitMap.get(ip);
  if (!r || now > r.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 3600_000 });
    return false;
  }
  if (r.count >= 5) return true;
  r.count++;
  return false;
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

async function send(key: string, payload: Record<string, unknown>) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Resend [${res.status}]: ${await res.text()}`);
}

const shell = (title: string, inner: string) => `
<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,sans-serif;background:#ffffff;padding:40px 20px">
  <div style="max-width:520px;margin:0 auto;color:#18181b;font-size:15px;line-height:1.7">
    <p style="margin:0 0 32px;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#a1a1aa">${title}</p>
    ${inner}
    <div style="margin-top:40px;padding-top:20px;border-top:1px solid #f4f4f5">
      <p style="margin:0;font-weight:600;color:#18181b">Diini M. Kahiye</p>
      <p style="margin:2px 0 10px;font-size:13px;color:#71717a">Data Analyst &amp; Junior Data Scientist · Mogadishu</p>
      <p style="margin:0;font-size:13px">
        <a href="https://www.diinikahiye.online" style="color:#18181b;text-decoration:none">diinikahiye.online</a>
        <span style="color:#d4d4d8">&nbsp;/&nbsp;</span>
        <a href="https://www.linkedin.com/in/diinikahiye/" style="color:#18181b;text-decoration:none">LinkedIn</a>
        <span style="color:#d4d4d8">&nbsp;/&nbsp;</span>
        <a href="https://github.com/Diini03" style="color:#18181b;text-decoration:none">GitHub</a>
      </p>
    </div>
  </div>
</div>`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(ip)) return json({ error: "Too many requests. Please try again later." }, 429);

    const { name, email, message } = await req.json();
    if (typeof name !== "string" || !name.trim() || name.length > 100) return json({ error: "Invalid name" }, 400);
    if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255)
      return json({ error: "Invalid email address" }, 400);
    if (typeof message !== "string" || !message.trim() || message.length > 1000)
      return json({ error: "Invalid message" }, 400);

    const key = Deno.env.get("RESEND_API_KEY");
    if (!key) return json({ error: "Email service not configured" }, 500);

    const n = esc(name.trim()), e = esc(email.trim()), m = esc(message.trim()).replace(/\n/g, "<br>");

    await send(key, {
      from: FROM,
      to: [OWNER],
      reply_to: email.trim(),
      subject: `New message from ${name.trim()}`,
      html: shell("contact form", `
        <p style="margin:0 0 4px"><b>From:</b> ${n}</p>
        <p style="margin:0 0 16px"><b>Email:</b> <a href="mailto:${e}" style="color:#EA580C">${e}</a></p>
        <div style="border-left:3px solid #EA580C;padding:8px 14px;background:#fafafa">${m}</div>
        <p style="color:#71717a;font-size:13px;margin-top:16px">Hit reply to answer ${n} directly.</p>`),
    });

    // Receipt to the visitor (non-blocking failure)
    try {
      await send(key, {
        from: FROM,
        to: [email.trim()],
        reply_to: OWNER,
        subject: "Thanks for reaching out — Diini Kahiye",
        html: shell("message received", `
          <p>Hi ${n},</p>
          <p>Thanks for your message — I've received it and will get back to you shortly.</p>
          <div style="border-left:3px solid #EA580C;padding:8px 14px;background:#fafafa;color:#52525b">${m}</div>
          <p style="margin-top:20px">— Diini Kahiye<br><a href="https://www.diinikahiye.online" style="color:#EA580C">diinikahiye.online</a></p>`),
      });
    } catch (err) {
      console.error("Receipt failed:", err);
    }

    return json({ success: true });
  } catch (err) {
    console.error("send-contact-email error:", err);
    return json({ error: "Failed to send message. Please try again later." }, 500);
  }
});
