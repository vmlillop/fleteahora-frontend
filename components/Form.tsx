// =====================
// components/Form.tsx — Inputs + estados
// =====================
'use client'
import { useState } from 'react'

type Field = {
  name: string
  label: string
  type?: string
  placeholder?: string
  autoComplete?: string
}

export function AuthForm({
  title,
  action,
  method = 'POST',
  fields,
  cta,
  help,
  onSuccess,
}: {
  title: string
  action: string
  method?: 'POST'|'PUT'|'PATCH'
  fields: Field[]
  cta: string
  help?: React.ReactNode
  onSuccess?: (data: any) => void
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string|undefined>()
  const [success, setSuccess] = useState<string|undefined>()

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(undefined)
    setSuccess(undefined)

    const form = new FormData(e.currentTarget)
    const body: Record<string,string> = {}
    for (const [k, v] of form.entries()) body[k] = String(v)

    try {
      const res = await fetch(action, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.error || 'Error inesperado')
      setSuccess('Operación realizada correctamente.')
      onSuccess?.(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container-narrow py-10">
      <div className="card">
        <h1 className="card-title">{title}</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          {fields.map((f) => (
            <div key={f.name} className="space-y-1">
              <label className="label" htmlFor={f.name}>{f.label}</label>
              <input id={f.name} name={f.name} type={f.type || 'text'} placeholder={f.placeholder}
                     autoComplete={f.autoComplete}
                     required className="input" />
            </div>
          ))}
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
          <button disabled={loading} className="btn-primary w-full">
            {loading ? 'Procesando…' : cta}
          </button>
          {help && <div className="help mt-2">{help}</div>}
        </form>
      </div>
    </div>
  )
}
