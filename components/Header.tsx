// =====================
// components/Header.tsx
// =====================
'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import Logo from '@/components/Logo'

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()

  async function logout() {
    await fetch('/api/auth/login', { method: 'DELETE' })
    router.push('/login')
  }

  return (
    <header className="border-b border-black/5 bg-white/70 backdrop-blur sticky top-0 z-50">
      <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="logo-wrap">
          <Logo size={22} />
          <span className="logo-title">FleteAhora</span>
        </Link>
        <nav className="hidden sm:flex items-center gap-3 text-sm">
          <Link href="/dashboard" className={pathname === '/dashboard' ? 'font-semibold' : ''}>Dashboard</Link>
          <button onClick={logout} className="btn-secondary">Salir</button>
        </nav>
      </div>
    </header>
  )
}
