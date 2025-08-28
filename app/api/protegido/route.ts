// =====================
// app/api/protegido/route.ts — Proxy protegido
// =====================
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { API } from '@/lib/api'

export async function GET() {
  const token = cookies().get('fa_token')?.value
  const res = await fetch(`${API.base}/api/protegido`, {
    headers: { Authorization: token ? `Bearer ${token}` : '' },
    cache: 'no-store'
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) return NextResponse.json({ error: data?.error || 'No autorizado' }, { status: res.status })
  return NextResponse.json(data)
}
