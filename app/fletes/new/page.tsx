'use client';
import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewFletePage() {
  const [origen, setOrigen] = useState('Santiago');
  const [destino, setDestino] = useState('Valparaíso');
  const [fecha, setFecha] = useState<string>('');
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();               // evita que el form “posteé” la ruta actual (eso causaba el 405)
    setMsg(null);
    setLoading(true);
    try {
      const res = await fetch('/api/fletes', {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({ origen, destino, fecha }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMsg(`❌ ${res.status} ${data?.error || 'No se pudo crear el flete'}`);
      } else {
        setMsg('✅ Flete creado');
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
    <div style={{ maxWidth: 420 }}>
      <h1>Nuevo Flete</h1>
      <form onSubmit={onSubmit} style={{ display:'grid', gap:10 }}>
        <label>Origen
          <input value={origen} onChange={(e)=>setOrigen(e.target.value)} required style={{ width:'100%' }}/>
        </label>
        <label>Destino
          <input value={destino} onChange={(e)=>setDestino(e.target.value)} required style={{ width:'100%' }}/>
        </label>
        <label>Fecha
          <input type="date" value={fecha} onChange={(e)=>setFecha(e.target.value)} required style={{ width:'100%' }}/>
        </label>
        <button disabled={loading} type="submit">{loading ? 'Guardando…' : 'Guardar'}</button>
      </form>
      {msg && <p style={{ marginTop:10 }}>{msg}</p>}
    </div>
  );
}

