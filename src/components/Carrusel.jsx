import { useState, useEffect, useCallback } from 'react'

const SLIDES = [
  {
    nombre: 'Carlos M.',
    ciudad: 'Punta Arenas',
    texto: 'Dejaron mi PC como nueva. El servicio fue rapido y el equipo quedo funcionando mejor que antes. Muy recomendados.',
    servicio: 'Limpieza y mantenimiento',
    inicial: 'C',
  },
  {
    nombre: 'María G.',
    ciudad: 'Puerto Natales',
    texto: 'El formateo lo terminaron el mismo dia. Muy profesionales, explicaron todo el proceso y quedé muy conforme.',
    servicio: 'Formateo e instalacion de Windows',
    inicial: 'M',
  },
  {
    nombre: 'Pedro L.',
    ciudad: 'Punta Arenas',
    texto: 'Instalaron el hardware perfectamente. Buen precio, buena atencion y entrega rapida. Volvere a elegirlos.',
    servicio: 'Instalacion de hardware',
    inicial: 'P',
  },
  {
    nombre: 'Ana R.',
    ciudad: 'Punta Arenas',
    texto: 'Armaron mi PC a medida con asesoria incluida. El equipo rinde excelente y el precio fue muy justo.',
    servicio: 'Armado de computadores',
    inicial: 'A',
  },
]

export default function Carrusel() {
  const [activo, setActivo] = useState(0)
  const [pausado, setPausado] = useState(false)

  const siguiente = useCallback(() => {
    setActivo((v) => (v + 1) % SLIDES.length)
  }, [])

  const anterior = () => setActivo((v) => (v - 1 + SLIDES.length) % SLIDES.length)

  useEffect(() => {
    if (pausado) return
    const id = setInterval(siguiente, 5000)
    return () => clearInterval(id)
  }, [pausado, siguiente])

  const slide = SLIDES[activo]

  return (
    <div
      className="carrusel"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
    >
      <div className="carrusel-track" style={{ transform: `translateX(-${activo * 100}%)` }}>
        {SLIDES.map((s, i) => (
          <div className="carrusel-slide" key={i}>
            <div className="carrusel-avatar">{s.inicial}</div>
            <blockquote className="carrusel-texto">"{s.texto}"</blockquote>
            <div className="carrusel-autor">
              <strong>{s.nombre}</strong>
              <span>{s.ciudad} — {s.servicio}</span>
            </div>
          </div>
        ))}
      </div>

      <button className="carrusel-btn carrusel-btn-prev" onClick={anterior} aria-label="Anterior">‹</button>
      <button className="carrusel-btn carrusel-btn-next" onClick={siguiente} aria-label="Siguiente">›</button>

      <div className="carrusel-dots">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`carrusel-dot ${i === activo ? 'activo' : ''}`}
            onClick={() => setActivo(i)}
            aria-label={`Ir a slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
