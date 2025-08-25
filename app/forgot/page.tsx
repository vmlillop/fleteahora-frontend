// app/forgot/page.tsx
"use client";

import { useState } from "react";

export default function ForgotPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{type: "ok" | "err"; text: string} | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg(null);
    setLoading(true);
    try {
      const r = await fetch("/api/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const body = await r.json().catch(() => ({}));
      if (r.ok) {
        setMsg({ type: "ok",  text: body?.mensaje || "Si el correo existe, enviaremos instrucciones." });
      } else {
        setMsg({ type: "err", text: body?.error || "No pudimos enviar las instrucciones." });
      }
    } catch (err: any) {
      setMsg({ type: "err", text: err?.message || "Error inesperado" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: 16, maxWidth: 480, margin: "0 auto" }}>
      <h1>Recuperar contraseña</h1>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <label style={{ display: "grid", gap: 4 }}>
          <span>Correo</span>
          <input
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@correo.com"
          />
        </label>
        <button type="submit" disabled={loading} style={{ padding: "8px 12px" }}>
          {loading ? "Enviando..." : "Enviar instrucciones"}
        </button>
      </form>

      {msg && (
        <p style={{ marginTop: 10, color: msg.type === "ok" ? "green" : "crimson" }}>
          {msg.text}
        </p>
      )}

      <p style={{ fontSize: 12, color: "#666", marginTop: 12 }}>
        Te enviaremos un enlace para restablecer tu contraseña si el correo existe.
      </p>
    </main>
  );
}
