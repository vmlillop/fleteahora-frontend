import Logo from '@/components/Logo'

export default function ResetOkPage() {
  return (
    <main className="container-narrow py-8 sm:py-12">
      <div className="card">
        <div className="flex flex-col items-center gap-3 mb-6">
          <Logo size={80} />
          <h1 className="card-title mb-0">Contraseña actualizada</h1>
        </div>
        <p className="card-subtitle">Tu contraseña fue restablecida correctamente.</p>
        <a className="btn-primary w-full inline-block text-center" href="/login">Ir a iniciar sesión</a>
      </div>
    </main>
  )
}
