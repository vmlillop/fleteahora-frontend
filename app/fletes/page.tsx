'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

type Flete = {
  id: number;
  origen: string;
  destino: string;
  fecha?: string;
  fecha_salida?: string;
  fecha_programada?: string;
};

export default function FletesPage() {
  const [data, setData] = useState<Flete[]>([]);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setMsg('Cargando…');
      const res = await fetch('/api/fletes', { cache: 'no-store' });
      if (res.status === 401) {
        setMsg('No autenticado. Ve a Login.');
        return;
      }
      const json = await res.json().catch(() => ([]));
      if (!res.ok) {
        setMsg(`Error: ${res.status}`);
      } else {
        setMsg(null);
        setData(Array.isArray(json) ? json : (json?.fletes || []));
      }
    };
    load();
  }, []);

  const fmt = (f: Flete) => {
    const raw = f.fecha || f.fecha_salida || f.fecha_programada;
    try { return raw ? new Date(raw).toLocaleDateString('es-CL') : ''; } catch { return raw || ''; }
  };

  return (
    <div>
      <h1>Fletes</h1>
      <div style={{ marginBottom:12 }}>
        <Link href="/fletes/new">➕ Nuevo flete</Link>
      </div>
      {msg && <p>{msg}</p>}
      {!msg && data.length === 0 && <p>Sin datos.</p>}
      <ul style={{ padding:0, listStyle:'none', display:'grid', gap:8 }}>
        {data.map(f => (
          <li key={f.id} style={{ border:'1px solid #eee', padding:10, borderRadius:8 }}>
            <strong>{f.origen} → {f.destino}</strong>
            {fmt(f) && <div>Fecha: {fmt(f)}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
}
