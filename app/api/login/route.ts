// app/api/login/route.ts
import { NextResponse } from 'next/server';

const API = process.env.NEXT_PUBLIC_API_URL!; // p.ej. http://52.90.55.128/api

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // OJO: /auth/login (no /login)
    const upstream = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await upstream.json().catch(() => ({}));

    if (!upstream.ok) {
      return NextResponse.json(data, { status: upstream.status });
    }

    const token: string = data.token;

    // Seteamos la cookie en el NextResponse (no con cookies().set)
    const res = NextResponse.json({ ok: true });
    res.cookies.set('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,        // cámbialo a true cuando tengas HTTPS
      path: '/',
      maxAge: 60 * 60 * 2,  // 2 horas
    });
    return res;
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'error' }, { status: 500 });
  }
}

