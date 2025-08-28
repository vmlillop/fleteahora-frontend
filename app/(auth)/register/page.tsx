'use client'
import Logo from '@/components/Logo'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import PasswordInput from '@/components/PasswordInput'

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string|null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const fd = new FormData(e.currentTarget)
    const nombre   = String(fd.get('nombre') || '').trim()
    const email    = String(fd.get('email')  || '').trim()
    const password = String(fd.get('password') || '')
    const password2= String(fd.get('password2') || '')
    const rol      = String(fd.get('rol') || 'cliente')

    if (password2 !== password) {
      setLoading(false)
      const el = document.getElementById('password2') as HTMLInputElement | null
      if (el) { el.setCustomValidity('Las contraseñas no coinciden'); el.reportValidity?.(); el.focus() }
      return
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, password, rol }),
      })
      const data = await res.json().catch(()=>({}))
      if (!res.ok) throw new Error(data?.error || 'No se pudo registrar')
      router.push('/login')
    } catch (err:any) {
      setError(String(err.message || err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container-narrow py-8 sm:py-12">
      <div className="card">
        <div className="flex flex-col items-center gap-3 mb-6">
          <Logo size={80}/>
          <h1 className="card-title mb-0">Crear cuenta</h1>
          <p className="card-subtitle text-center">Completa tus datos para registrarte.</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4" noValidate>
          <div className="space-y-1">
            <label className="label" htmlFor="nombre">Nombre completo</label>
            <input id="nombre" name="nombre" required className="input" placeholder="Tu nombre"/>
          </div>

          <div className="space-y-1">
            <label className="label" htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              name="email"
              type="email"
              inputMode="email"
              required
              className="input"
              placeholder="nombre@dominio.com"
              pattern="^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@(?:[A-Za-z0-9-]+\.)+[A-Za-z]{2,63}$"
              title="Ingresa un correo válido (ej: nombre@dominio.com)"
            />
          </div>

          <PasswordInput
            label="Contraseña"
            name="password"
            id="password"
            autoComplete="new-password"
            minLength={8}
            required
            placeholder="••••••••"
            title="Mínimo 8 caracteres, mezcla de letras, números y símbolo"
          />
          <p className="help">Mínimo 8 caracteres, incluye letras, números y símbolo.</p>

          <PasswordInput
            label="Reingresa la contraseña"
            name="password2"
            id="password2"
            autoComplete="new-password"
            required
            placeholder="••••••••"
            onInput={(e) => {
              const pass = (document.getElementById('password') as HTMLInputElement)?.value || ''
              const el = e.currentTarget as HTMLInputElement
              el.setCustomValidity(el.value === pass ? '' : 'Las contraseñas no coinciden')
            }}
          />

          <div className="space-y-1">
            <label className="label" htmlFor="rol">Rol</label>
            <select id="rol" name="rol" className="input" defaultValue="cliente" required>
              <option value="cliente">cliente</option>
              <option value="transportista">transportista</option>
              <option value="admin">admin</option>
            </select>
          </div>

          {error && <p className="error">{error}</p>}

          <button className="btn-primary w-full" disabled={loading}>
            {loading ? 'Registrando…' : 'Registrarme'}
          </button>

          <div className="help text-center">
            ¿Ya tienes cuenta? <a href="/login" className="underline">Inicia sesión</a>
          </div>
        </form>
      </div>
    </main>
  )
}
