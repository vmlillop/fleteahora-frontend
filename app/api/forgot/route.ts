export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const email = String(body?.email ?? "").trim();
    if (!email) {
      return NextResponse.json({ error: "Email requerido" }, { status: 400 });
    }

    // Fallback si no está BACKEND_API_BASE en runtime
    const apiBase = process.env.BACKEND_API_BASE || "http://52.90.55.128";
    const r = await fetch(`${apiBase}/api/auth/forgot`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });

    const data = await r.json().catch(() => ({}));
    if (!r.ok) {
      return NextResponse.json(
        data?.error ? data : { error: "Error del API" },
        { status: r.status || 500 }
      );
    }
    // Devuelve el mismo mensaje genérico del backend
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Error inesperado" }, { status: 500 });
  }
}
