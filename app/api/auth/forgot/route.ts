// app/api/auth/forgot/route.ts — passthrough al backend
import { NextResponse } from 'next/server'
import { API } from '@/lib/api'

export async function POST(req: Request) {
  const body = await req.json()
  const res = await fetch(`${API.base}/api/auth/forgot`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    return NextResponse.json({ error: data?.error || 'Error en forgot' }, { status: res.status })
  }
  return NextResponse.json(data)
}
