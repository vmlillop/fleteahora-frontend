// =====================
// app/dashboard/page.tsx — Ruta protegida real
// =====================
import { cookies } from 'next/headers'

export default async function DashboardPage() {
  const jar = cookies()
  const token = jar.get('fa_token')?.value

  // Llamamos a la API interna que reenvía al backend con el token de la cookie
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/protegido`, { cache: 'no-store' })
  const data = await res.json().catch(() => ({}))

  return (
    <main className="container-narrow py-10">
      <div className="card">
        <h1 className="card-title">Dashboard</h1>
        {!token && <p className="error">No hay sesión iniciada.</p>}
        <pre className="text-sm bg-gray-50 p-3 rounded-xl overflow-auto">{JSON.stringify(data, null, 2)}</pre>
      </div>
    </main>
  )
}

