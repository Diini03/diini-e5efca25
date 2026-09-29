import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";
import { z } from "npm:zod@3";

const SITE = "https://diinikahiye.online";
const FROM = "Diini Kahiye <no-reply@diinikahiye.online>";
const REPLY_TO = "diiniyare74@gmail.com";

const Body = z.object({
  email: z.string().trim().toLowerCase().email().max(255),
  source: z.string().max(60).optional(),
});

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

function welcomeHtml(unsubUrl: string) {
  const link = (href: string, label: string) =>
    `<a href="${href}" style="display:inline-block;margin:0 6px 8px 0;padding:9px 16px;border:1px solid #EA580C;border-radius:6px;color:#EA580C;text-decoration:none;font-size:13px;font-weight:600;">${label}</a>`;
  return `<!DOCTYPE html><html><body style="margin:0;padding:0;background:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#1f2330;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;padding:32px 16px;"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;border:1px solid #e6e7ec;border-radius:10px;overflow:hidden;">
<tr><td style="background:#303446;padding:22px 28px;">
  <span style="font-family:'SF Mono',Menlo,Consolas,monospace;font-size:14px;color:#c6d0f5;">~/<span style="color:#EA580C;font-weight:700;">Diini Kahiye</span>.</span>
</td></tr>
<tr><td style="height:3px;background:#EA580C;line-height:3px;font-size:0;">&nbsp;</td></tr>
<tr><td style="padding:32px 28px 8px;">
  <p style="margin:0 0 6px;font-family:Menlo,Consolas,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#EA580C;">Subscription confirmed</p>
  <h1 style="margin:0 0 18px;font-size:24px;line-height:1.3;color:#1f2330;">Welcome aboard — thanks for subscribing.</h1>
  <p style="margin:0 0 14px;font-size:15px;line-height:1.65;color:#3b4050;">Hi there,</p>
  <p style="margin:0 0 14px;font-size:15px;line-height:1.65;color:#3b4050;">I'm Diini, a data analyst working with Python, SQL, Power BI and machine learning — mostly on real problems from Somalia and East Africa.</p>
  <p style="margin:0 0 10px;font-size:15px;line-height:1.65;color:#3b4050;">From now on, you'll get a direct email whenever I:</p>
  <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 18px;">
    <tr><td style="padding:4px 10px 4px 0;color:#EA580C;font-weight:700;">→</td><td style="font-size:15px;color:#3b4050;"><strong>Publish a new article</strong> on data, analytics and ML</td></tr>
    <tr><td style="padding:4px 10px 4px 0;color:#EA580C;font-weight:700;">→</td><td style="font-size:15px;color:#3b4050;"><strong>Ship a new project</strong> — dashboards, models and live tools</td></tr>
    <tr><td style="padding:4px 10px 4px 0;color:#EA580C;font-weight:700;">→</td><td style="font-size:15px;color:#3b4050;"><strong>Share key updates</strong> worth your time — no spam, ever</td></tr>
  </table>
  <p style="margin:0 0 22px;"><a href="${SITE}/blog" style="display:inline-block;padding:12px 22px;background:#EA580C;border-radius:6px;color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;">Read the latest writing</a></p>
</td></tr>
<tr><td style="padding:0 28px 26px;">
  <div style="border-top:1px solid #e6e7ec;padding-top:22px;">
    <p style="margin:0 0 10px;font-size:14px;line-height:1.6;color:#3b4050;">I post most often on <strong>LinkedIn</strong> and build in the open on <strong>GitHub</strong> — come say hi:</p>
    ${link("https://www.linkedin.com/in/diinikahiye/", "LinkedIn")}${link("https://github.com/Diini03", "GitHub")}${link(`${SITE}/projects`, "Projects")}
  </div>
</td></tr>
<tr><td style="padding:0 28px 28px;">
  <p style="margin:0;font-size:15px;line-height:1.6;color:#3b4050;">Talk soon,<br><strong>Diini M. Kahiye</strong><br><span style="font-size:13px;color:#7a8093;">Data Analyst · Mogadishu, Somalia</span></p>
</td></tr>
<tr><td style="background:#f6f7f9;padding:18px 28px;border-top:1px solid #e6e7ec;">
  <p style="margin:0;font-size:12px;line-height:1.6;color:#8a8fa0;">You're receiving this because you subscribed at <a href="${SITE}" style="color:#8a8fa0;">diinikahiye.online</a>. Replies go straight to me.<br><a href="${unsubUrl}" style="color:#8a8fa0;">Unsubscribe</a></p>
</td></tr>
</table></td></tr></table></body></html>`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );
  const url = new URL(req.url);

  // Unsubscribe via link
  const token = url.searchParams.get("unsubscribe");
  if (req.method === "GET" && token) {
    if (!z.string().uuid().safeParse(token).success) {
      return new Response("Invalid link", { status: 400 });
    }
    await supabase.from("subscribers").update({ subscribed: false }).eq("unsubscribe_token", token);
    return new Response(
      `<html><body style="font-family:sans-serif;text-align:center;padding:60px;background:#303446;color:#c6d0f5"><h2>You've been unsubscribed.</h2><p>Sorry to see you go. <a style="color:#EA580C" href="${SITE}">Back to the site</a></p></body></html>`,
      { headers: { "Content-Type": "text/html; charset=utf-8" } },
    );
  }

  try {
    const parsed = Body.safeParse(await req.json());
    if (!parsed.success) return json({ error: "Please enter a valid email." }, 400);
    const { email, source } = parsed.data;

    const { data: existing } = await supabase
      .from("subscribers").select("id, subscribed, unsubscribe_token").eq("email", email).maybeSingle();

    if (existing?.subscribed) return json({ status: "already" });

    let unsubToken = existing?.unsubscribe_token;
    if (existing) {
      await supabase.from("subscribers").update({ subscribed: true }).eq("id", existing.id);
    } else {
      const { data, error } = await supabase
        .from("subscribers").insert({ email, source }).select("unsubscribe_token").single();
      if (error) throw new Error(error.message);
      unsubToken = data.unsubscribe_token;
    }

    const unsubUrl = `${Deno.env.get("SUPABASE_URL")}/functions/v1/subscribe?unsubscribe=${unsubToken}`;
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [email],
        reply_to: REPLY_TO,
        subject: "Welcome — you're subscribed to Diini Kahiye",
        html: welcomeHtml(unsubUrl),
        headers: { "List-Unsubscribe": `<${unsubUrl}>` },
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      console.error(`Resend failed [${res.status}]: ${body}`);
      return json({ status: "subscribed", emailSent: false, details: body });
    }
    return json({ status: "subscribed", emailSent: true });
  } catch (e) {
    console.error(e);
    return json({ error: "Something went wrong. Please try again." }, 500);
  }
});
