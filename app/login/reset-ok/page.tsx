export default function ResetOkPage() {
  return (
    <main style={{padding:16, maxWidth:480, margin:"0 auto"}}>
      <h1>Contraseña actualizada ✅</h1>
      <p>Tu contraseña fue restablecida correctamente. Inicia sesión para continuar.</p>
      <p>
        <a href="/login"
           style={{display:"inline-block",padding:"8px 12px",border:"1px solid #333",
                   borderRadius:6,textDecoration:"none"}}
        >
          Ir a Login
        </a>
      </p>
    </main>
  );
}
