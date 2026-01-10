import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  message: string;
}

// Simple in-memory rate limiting (resets on function cold start)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5; // Max requests
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour in ms

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return false;
  }
  
  if (record.count >= RATE_LIMIT) {
    return true;
  }
  
  record.count++;
  return false;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get client IP for rate limiting
    const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                     req.headers.get("cf-connecting-ip") || 
                     "unknown";
    
    if (isRateLimited(clientIP)) {
      console.log(`Rate limited IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { name, email, message }: ContactEmailRequest = await req.json();

    // Server-side validation
    if (!name || typeof name !== "string" || name.trim().length === 0 || name.length > 100) {
      return new Response(
        JSON.stringify({ error: "Invalid name" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email) || email.length > 255) {
      return new Response(
        JSON.stringify({ error: "Invalid email address" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length === 0 || message.length > 1000) {
      return new Response(
        JSON.stringify({ error: "Invalid message" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get EmailJS credentials from secrets
    const serviceId = Deno.env.get("EMAILJS_SERVICE_ID");
    const templateId = Deno.env.get("EMAILJS_TEMPLATE_ID");
    const publicKey = Deno.env.get("EMAILJS_PUBLIC_KEY");
    const privateKey = Deno.env.get("EMAILJS_PRIVATE_KEY");

    // Log which secrets are present (length only for security)
    console.log("EmailJS config check:", {
      serviceId: serviceId ? `set (${serviceId.length} chars)` : "MISSING",
      templateId: templateId ? `set (${templateId.length} chars)` : "MISSING",
      publicKey: publicKey ? `set (${publicKey.length} chars)` : "MISSING",
      privateKey: privateKey ? `set (${privateKey.length} chars)` : "MISSING",
    });

    if (!serviceId || !templateId || !publicKey || !privateKey) {
      console.error("Missing EmailJS configuration - one or more secrets not set");
      return new Response(
        JSON.stringify({ error: "Email service not configured", details: "Missing required secrets" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const requestOrigin = req.headers.get("origin") ?? "http://localhost";
    console.log("Sending EmailJS request with origin:", requestOrigin);

    // Send email via EmailJS REST API with accessToken for server-side calls
    const emailResponse = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // EmailJS requires browser-like headers for server-side calls
        "Origin": requestOrigin,
        "Referer": requestOrigin + "/",
        "User-Agent": "Mozilla/5.0 (compatible; LovableApp/1.0)",
      },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        accessToken: privateKey,
        template_params: {
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          title: name.trim(),
        },
      }),
    });

    const responseText = await emailResponse.text();
    console.log("EmailJS response:", {
      status: emailResponse.status,
      statusText: emailResponse.statusText,
      body: responseText,
    });

    if (!emailResponse.ok) {
      return new Response(
        JSON.stringify({ 
          error: "Failed to send email", 
          emailjs_status: emailResponse.status,
          emailjs_response: responseText 
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Email sent successfully from ${email}`);

    return new Response(
      JSON.stringify({ success: true, message: "Email sent successfully" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);
