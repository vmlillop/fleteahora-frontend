// =====================
// app/api/auth/login/route.ts — Login: guarda cookie httpOnly
// =====================
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { API } from '@/lib/api'
import { serializeAuthCookie } from '@/lib/auth'

export async function POST(req: Request) {
  const body = await req.json()
  const res = await fetch(`${API.base}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    return NextResponse.json({ error: data?.error || 'Error en login' }, { status: res.status })
  }

  // Se asume que el backend devuelve { token, usuario }
  const token: string | undefined = data?.token
  if (token) {
    cookies().set({ name: 'fa_token', value: token, httpOnly: true, sameSite: 'lax', path: '/', maxAge: 60*60*24*7 })
  }
  return NextResponse.json({ ok: true, usuario: data?.usuario })
}

export async function DELETE() {
  cookies().set({ name: 'fa_token', value: '', path: '/', maxAge: 0 })
  return NextResponse.json({ ok: true })
}
