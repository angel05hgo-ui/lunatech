import { Link } from 'react-router-dom'
import { useMoneda, MONEDAS } from '../context/MonedaContext.jsx'
import { servicios } from '../data/servicios.js'
import ConvertidorDivisas from '../components/ConvertidorDivisas.jsx'
import ServicioCard from '../components/ServicioCard.jsx'
import Reveal from '../components/Reveal.jsx'
import Carrusel from '../components/Carrusel.jsx'

export default function Inicio() {
  const { monedaActiva, setMonedaActiva } = useMoneda()
  const destacados = servicios.slice(0, 3)

  return (
    <div className="pagina inicio">
      <section className="hero">
        <div className="hero-texto">
          <span className="hero-badge">Servicio tecnico de elite</span>
          <h1>Lleva tu <span>computador</span> al siguiente nivel</h1>
          <p>
            En LunaTech entregamos servicios profesionales de mantenimiento, reparacion
            y optimizacion de equipos. Rapidos, confiables y a tu medida.
          </p>
          <div className="hero-botones">
            <Link to="/cotizar" className="btn btn-primario">Cotizar ahora</Link>
            <Link to="/servicios" className="btn btn-secundario">Ver servicios</Link>
          </div>
        </div>
        <div className="hero-img">
          <img
            src="https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80"
            alt="Setup tecnico profesional"
          />
          <div className="hero-float">
            <div className="hero-float-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="11" fill="#ecfdf5" stroke="#16a34a" strokeWidth="1.5"/>
                <path d="M7 12.5l3.5 3.5L17 9" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="hero-float-txt">
              <strong>+1.200 equipos</strong>
              <span>reparados exitosamente</span>
            </div>
          </div>
        </div>
      </section>

      {/* Selector de moneda + convertidor */}
      <section className="seccion">
        <Reveal>
          <div className="moneda-selector card">
            <h3>Selecciona la moneda para ver los precios</h3>
            <div className="moneda-botones">
              {Object.keys(MONEDAS).map((key) => (
                <button
                  key={key}
                  className={`btn-moneda ${monedaActiva === key ? 'activa' : ''}`}
                  onClick={() => setMonedaActiva(key)}
                >
                  {MONEDAS[key].etiqueta}
                </button>
              ))}
            </div>
            <p className="nota">Moneda por defecto: Peso Chileno (CLP). Los precios se actualizan dinamicamente.</p>
          </div>
        </Reveal>
        <Reveal delay={1}>
          <ConvertidorDivisas />
        </Reveal>
      </section>

      {/* Servicios destacados */}
      <section className="seccion">
        <Reveal>
          <h2 className="seccion-titulo">Servicios <span>destacados</span></h2>
          <p className="seccion-intro">Los servicios mas solicitados por nuestros clientes, con garantia de calidad y respuesta rapida.</p>
        </Reveal>
        <div className="servicios-grid">
          {destacados.map((s, i) => (
            <Reveal key={s.id} delay={(i % 3) + 1}>
              <ServicioCard servicio={s} />
            </Reveal>
          ))}
        </div>
        <div className="centro">
          <Link to="/servicios" className="btn btn-primario">Ver todos los servicios</Link>
        </div>
      </section>

      {/* Carrusel de testimonios */}
      <section className="seccion">
        <Reveal>
          <h2 className="seccion-titulo">Lo que dicen <span>nuestros clientes</span></h2>
          <p className="seccion-intro">Opiniones de clientes reales que confiaron en LunaTech para sus equipos.</p>
        </Reveal>
        <Reveal delay={1}>
          <Carrusel />
        </Reveal>
      </section>
    </div>
  )
}
