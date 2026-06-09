import { useEffect, useState } from 'react'
import { useReveal } from '../utils/useReveal.js'

// Contador que sube desde 0 hasta el valor final cuando entra en pantalla.
export default function Contador({ valor, sufijo = '', duracion = 1600 }) {
  const [ref, visible] = useReveal()
  const [actual, setActual] = useState(0)

  useEffect(() => {
    if (!visible) return
    let inicio = null
    const objetivo = valor

    function paso(timestamp) {
      if (!inicio) inicio = timestamp
      const progreso = Math.min((timestamp - inicio) / duracion, 1)
      // easing suave (easeOutExpo)
      const eased = progreso === 1 ? 1 : 1 - Math.pow(2, -10 * progreso)
      setActual(Math.floor(eased * objetivo))
      if (progreso < 1) requestAnimationFrame(paso)
      else setActual(objetivo)
    }

    requestAnimationFrame(paso)
  }, [visible, valor, duracion])

  return (
    <span ref={ref} className="stat-num">
      {actual.toLocaleString('es-CL')}{sufijo}
    </span>
  )
}
