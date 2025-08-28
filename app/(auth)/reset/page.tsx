'use client'
import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Logo from '@/components/Logo'
import PasswordInput from '@/components/PasswordInput'

export const dynamic = 'force-dynamic'

function ResetInner() {
  const qp = useSearchParams()
  const token = qp.get('token') || ''
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string|null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    if (password !== confirm) { setError('Las contraseñas no coinciden'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/auth/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      })
      const data = await res.json().catch(()=>({}))
      if (!res.ok) throw new Error(data?.error || 'No se pudo restablecer la contraseña')
      setDone(true)
    } catch (err:any) {
      setError(String(err.message || err))
    } finally { setLoading(false) }
  }

  return done ? (
    <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-green-700">
      ✅ Contraseña actualizada. <a className="underline" href="/login">Inicia sesión</a>.
    </div>
  ) : (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <PasswordInput
        label="Nueva contraseña"
        name="password"
        id="password"
        required
        autoComplete="new-password"
        value={password}
        onChange={e => setPassword((e.target as HTMLInputElement).value)}
      />
      <PasswordInput
        label="Repite la contraseña"
        name="confirm"
        id="confirm"
        required
        autoComplete="new-password"
        value={confirm}
        onChange={e => setConfirm((e.target as HTMLInputElement).value)}
        onInput={(e) => {
          const pass = (document.getElementById('password') as HTMLInputElement)?.value || ''
          const el = e.currentTarget as HTMLInputElement
          el.setCustomValidity(el.value === pass ? '' : 'Las contraseñas no coinciden')
        }}
      />
      {error && <p className="error">{error}</p>}
      <button className="btn-primary w-full" disabled={loading}>
        {loading ? 'Guardando…' : 'Guardar nueva contraseña'}
      </button>
    </form>
  )
}

export default function ResetPage() {
  return (
    <main className="container-narrow py-8 sm:py-12">
      <div className="card">
        <div className="flex flex-col items-center gap-3 mb-6">
          <Logo size={120} />
          <h1 className="card-title mb-0">Restablecer contraseña</h1>
        </div>
        <Suspense fallback={<div className="text-sm text-gray-500">Cargando…</div>}>
          <ResetInner />
        </Suspense>
      </div>
    </main>
  )
}
