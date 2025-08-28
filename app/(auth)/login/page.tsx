'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Logo from '@/components/Logo'
import PasswordInput from '@/components/PasswordInput'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string|null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null); setLoading(true)
    const fd = new FormData(e.currentTarget)
    const email = String(fd.get('email') || '')
    const password = String(fd.get('password') || '')
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json().catch(()=>({}))
      if (!res.ok) throw new Error(data?.error || 'Credenciales inválidas')
      router.push('/dashboard')
    } catch (err:any) {
      setError(String(err.message || err))
    } finally { setLoading(false) }
  }

  return (
    <main className="container-narrow py-8 sm:py-12">
      <div className="card">
        <div className="flex flex-col items-center gap-3 mb-6">
          <Logo size={120} />
          <h1 className="card-title mb-0">Iniciar sesión</h1>
          <p className="card-subtitle text-center">Accede para gestionar tus fletes.</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4" noValidate>
          <div className="space-y-1">
            <label className="label" htmlFor="email">Correo electrónico</label>
            <input id="email" name="email" type="email" autoComplete="email" required className="input" />
          </div>

          <PasswordInput
            label="Contraseña"
            name="password"
            id="password"
            autoComplete="current-password"
            required
          />

          {error && <p className="error">{error}</p>}

          <button className="btn-primary w-full" disabled={loading}>
            {loading ? 'Entrando…' : 'Entrar'}
          </button>

          <div className="help mt-2 flex flex-col sm:flex-row sm:justify-between gap-2">
            <a className="underline" href="/forgot">¿Olvidaste tu contraseña?</a>
            <span>¿Sin cuenta? <a className="underline" href="/register">Crear cuenta</a></span>
          </div>
        </form>
      </div>
    </main>
  )
}
