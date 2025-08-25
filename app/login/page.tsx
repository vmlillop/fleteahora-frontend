'use client';
import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('juan@mail.com');
  const [password, setPassword] = useState('123456');
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMsg(null);
    setLoading(true);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMsg(`❌ ${res.status} ${data?.error || 'Login fallido'}`);
      } else {
        setMsg('✅ Login OK. Redirigiendo…');
        router.push('/fletes');
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setMsg(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 380 }}>
      <h1>Login</h1>
      <form onSubmit={onSubmit} style={{ display:'grid', gap:10 }}>
        <label>Email
          <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" required style={{ width:'100%' }}/>
        </label>
        <label>Contraseña
          <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" required style={{ width:'100%' }}/>
        </label>
        <button disabled={loading} type="submit">{loading ? 'Entrando…' : 'Entrar'}</button>
      </form>
      {msg && <p style={{ marginTop:10 }}>{msg}</p>}
    </div>
  );
}

