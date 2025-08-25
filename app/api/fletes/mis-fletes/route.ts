import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API = process.env.NEXT_PUBLIC_API_URL;

export async function GET() {
  if (!API) return NextResponse.json({ error: 'API URL no configurada' }, { status: 500 });

  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const res = await fetch(`${API}/fletes/mis-fletes`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}

