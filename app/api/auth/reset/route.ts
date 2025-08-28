// =====================
// app/api/auth/reset/route.ts — Reset (pasa-through)
// =====================
import { NextResponse } from 'next/server'
import { API } from '@/lib/api'

export async function POST(req: Request) {
  const body = await req.json()
  const res = await fetch(`${API.base}/api/auth/reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) return NextResponse.json({ error: data?.error || 'Error en reset' }, { status: res.status })
  return NextResponse.json(data)
}
