export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const token = String(form.get("token") ?? "");
    const password = String(form.get("password") ?? "");

    if (!token || !password) {
      return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
    }

    const apiBase = process.env.BACKEND_API_BASE || "http://52.90.55.128";
    const r = await fetch(`${apiBase}/api/auth/reset`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    const body = await r.json().catch(() => ({}));
    if (!r.ok) {
      return NextResponse.json(
        body?.error ? body : { error: "Error del API" },
        { status: r.status || 500 }
      );
    }

    // Redirección ABSOLUTA usando headers del proxy/Nginx
    const proto = req.headers.get("x-forwarded-proto") ?? "http";
    const host  = req.headers.get("x-forwarded-host")  ?? req.headers.get("host") ?? "localhost:3000";
    const absolute = new URL("/login/reset-ok", `${proto}://${host}`).toString();
    return NextResponse.redirect(absolute, 303);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Error inesperado" }, { status: 500 });
  }
}
