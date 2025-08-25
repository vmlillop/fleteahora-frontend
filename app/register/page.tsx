'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState<'cliente'|'transportista'>('cliente');
  const [msg, setMsg] = useState<string|null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null); setLoading(true);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ nombre, correo, password, rol }),
      });
      const data = await res.json().catch(()=>({}));
      if (!res.ok) return setMsg(`❌ ${res.status} ${data?.error||'Registro fallido'}`);
      setMsg('✅ Registro exitoso. Redirigiendo al login…');
      setTimeout(()=>router.push('/login'), 800);
    } catch (err:any) {
      setMsg(`Error: ${err?.message||'desconocido'}`);
    } finally { setLoading(false); }
  };

  return (
    <div style={{maxWidth:420}}>
      <h1>Crear cuenta</h1>
      <form onSubmit={onSubmit} style={{display:'grid',gap:10}}>
        <label>Nombre
          <input value={nombre} onChange={e=>setNombre(e.target.value)} required />
        </label>
        <label>Correo
          <input value={correo} onChange={e=>setCorreo(e.target.value)} type="email" required />
        </label>
        <label>Contraseña
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password" required />
        </label>
        <label>Tipo de usuario
          <select value={rol} onChange={e=>setRol(e.target.value as any)}>
            <option value="cliente">Cliente</option>
            <option value="transportista">Transportista</option>
          </select>
        </label>
        <button disabled={loading} type="submit">{loading?'Creando…':'Registrarme'}</button>
      </form>
      {msg && <p style={{marginTop:10}}>{msg}</p>}
    </div>
  );
}

