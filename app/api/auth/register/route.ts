// =====================
// app/api/auth/register/route.ts — Registro (pasa-through)
// =====================
import { NextResponse } from 'next/server'
import { API } from '@/lib/api'

export async function POST(req: Request) {
  const body = await req.json()
  const res = await fetch(`${API.base}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) return NextResponse.json({ error: data?.error || 'Error en registro' }, { status: res.status })
  return NextResponse.json(data)
}
