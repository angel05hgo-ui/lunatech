import { useReveal } from '../utils/useReveal.js'

// Envuelve cualquier contenido y lo anima cuando aparece en pantalla.
export default function Reveal({ children, delay = 0, className = '' }) {
  const [ref, visible] = useReveal()
  const delayClass = delay ? `delay-${delay}` : ''

  return (
    <div ref={ref} className={`reveal ${delayClass} ${visible ? 'visible' : ''} ${className}`}>
      {children}
    </div>
  )
}
