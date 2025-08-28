// components/PasswordInput.tsx
'use client'
import React, { useState } from 'react'

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string
  name: string
  id?: string
}

export default function PasswordInput({ label, name, id, ...props }: Props) {
  const [visible, setVisible] = useState(false)
  const inputId = id || name

  return (
    <div className="space-y-1">
      <label className="label" htmlFor={inputId}>{label}</label>
      <div className="relative">
        <input
          id={inputId}
          name={name}
          type={visible ? 'text' : 'password'}
          className="input pr-10"
          {...props}
        />
        <button
          type="button"
          aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          className="absolute inset-y-0 right-0 px-2 flex items-center text-gray-500 hover:text-gray-700"
          onClick={() => setVisible(v => !v)}
        >
          {/* Ojo / Ojo tachado en SVG, sin dependencias */}
          {visible ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M2 2l20 20" stroke="currentColor" strokeWidth="2" />
              <path d="M3 12s3.5-7 9-7 9 7 9 7c-.8 1.6-2.3 3.5-4.6 5M9.9 9.9a3 3 0 104.2 4.2" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" stroke="currentColor" strokeWidth="2" fill="none"/>
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}
