import { createClient } from "npm:@supabase/supabase-js@2";

Deno.serve(async () => {
  const s = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const email = "info@diinikahiye.online";
  let { data, error } = await s.auth.admin.createUser({ email, password: "12345678Aa#", email_confirm: true });
  let id = data?.user?.id;
  if (error) {
    const { data: list } = await s.auth.admin.listUsers();
    id = list.users.find((u) => u.email === email)?.id;
  }
  if (!id) return new Response(JSON.stringify({ error: error?.message }), { status: 500 });
  const r = await s.from("user_roles").upsert({ user_id: id, role: "admin" }, { onConflict: "user_id,role" });
  return new Response(JSON.stringify({ ok: true, roleErr: r.error?.message ?? null }));
});
