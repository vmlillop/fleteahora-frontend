import Link from 'next/link';
import './globals.css';

export const metadata = { title: 'FleteAhora', description: 'MVP FleteAhora' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body style={{ fontFamily: 'system-ui, Arial', margin: 0 }}>
        <nav style={{ display:'flex', gap:12, padding:12, borderBottom:'1px solid #eee' }}>
          <Link href="/">Inicio</Link>
          <Link href="/fletes">Fletes</Link>
          <Link href="/fletes/new">Nuevo flete</Link>
          <Link href="/login" style={{ marginLeft: 'auto' }}>Login</Link>
        </nav>
        <main style={{ padding:16, maxWidth:900, margin:'0 auto' }}>{children}</main>
      </body>
    </html>
  );
}
