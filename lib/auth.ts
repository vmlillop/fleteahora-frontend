// =====================
// lib/auth.ts — cookies helpers
// =====================
import { cookies } from 'next/headers'

export function getTokenFromCookies() {
  const jar = cookies()
  return jar.get('fa_token')?.value
}

export function serializeAuthCookie(token: string) {
  // 7 días
  const maxAge = 7 * 24 * 60 * 60
  return `fa_token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}`
}
