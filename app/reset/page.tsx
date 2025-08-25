// app/reset/page.tsx
'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ResetFormInner() {
  const sp = useSearchParams();
  const token = sp.get('token') ?? '';
  const email = sp.get('email') ?? '';

  return (
    <>
      <p>Ingresa la nueva contraseña {email ? <>para <b>{email}</b></> : <>para tu cuenta</>}.</p>
      <form action="/reset/submit" method="POST" style={{ display: 'grid', gap: 12 }}>
        <input type="hidden" name="token" value={token} />
        <label style={{ display: 'grid', gap: 4 }}>
          <span>Nueva contraseña</span>
          <input
            name="password"
            type="password"
            required
            pattern="(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}"
            title="Mínimo 8 caracteres, con mayúscula, minúscula y número"
          />
        </label>
        <button type="submit" style={{ padding: '8px 12px' }}>Guardar</button>
      </form>
      <p style={{ fontSize: 12, color: '#666' }}>
        Si abriste este enlace desde tu correo, el token ya viene incluido.
      </p>
    </>
  );
}

export default function ResetPage() {
  return (
    <main style={{ padding: 16, maxWidth: 480, margin: '0 auto' }}>
      <h1>Restablecer contraseña</h1>
      <Suspense fallback={<p>Cargando…</p>}>
        <ResetFormInner />
      </Suspense>
    </main>
  );
}
