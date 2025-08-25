// app/api/fletes/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API = process.env.NEXT_PUBLIC_API_URL!;

export async function GET() {
  if (!API) return NextResponse.json({ error: 'API URL no configurada' }, { status: 500 });

  const cookieStore = await cookies();                 // <--- await
  const token = cookieStore.get('token')?.value;
  if (!token) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const r = await fetch(`${API}/fletes`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await r.json().catch(() => ({}));
  return NextResponse.json(data, { status: r.status });
}

export async function POST(req: Request) {
  if (!API) return NextResponse.json({ error: 'API URL no configurada' }, { status: 500 });

  const body = await req.json().catch(() => ({}));
  const cookieStore = await cookies();                 // <--- await
  const token = cookieStore.get('token')?.value;
  if (!token) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const r = await fetch(`${API}/fletes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const data = await r.json().catch(() => ({}));
  return NextResponse.json(data, { status: r.status });
}

