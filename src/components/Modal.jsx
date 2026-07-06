import { useEffect } from 'react'
import { createPortal } from 'react-dom'

export default function Modal({ abierto, onCerrar, children }) {
  useEffect(() => {
    if (!abierto) return
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [abierto])

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onCerrar() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onCerrar])

  if (!abierto) return null

  return createPortal(
    <div className="modal-overlay" onClick={onCerrar} role="dialog" aria-modal="true">
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-cerrar" onClick={onCerrar} aria-label="Cerrar">✕</button>
        {children}
      </div>
    </div>,
    document.body
  )
}
