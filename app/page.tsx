// =====================
// app/page.tsx — Home pública
// =====================
import Link from 'next/link'

export default function Home() {
  return (
    <main className="container-narrow py-10">
      <div className="card">
        <h1 className="card-title">Bienvenido a FleteAhora</h1>
        <p className="mb-4">Accede a tu cuenta o regístrate para gestionar tus fletes.</p>
        <div className="flex gap-3">
          <Link className="btn-primary" href="/login">Iniciar sesión</Link>
          <Link className="btn-secondary" href="/register">Crear cuenta</Link>
        </div>
      </div>
    </main>
  )
}
