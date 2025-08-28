// =====================
// lib/api.ts — helper para proxy interno
// =====================
export const API = {
  base: process.env.BACKEND_API_BASE || process.env.NEXT_PUBLIC_BACKEND_API_BASE || 'http://localhost:8080',
}
