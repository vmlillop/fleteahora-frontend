import { NextResponse } from 'next/server';
const API = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: Request) {
  if (!API) return NextResponse.json({ error:'API URL no configurada' }, { status:500 });
  const body = await req.json().catch(()=> ({}));
  const res = await fetch(`${API}/auth/reset`, {
    method:'POST',
    headers:{ 'Content-Type':'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(()=> ({}));
  return NextResponse.json(data, { status: res.status });
}

