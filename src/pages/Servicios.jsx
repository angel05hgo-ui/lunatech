import { Link } from 'react-router-dom'
import { servicios } from '../data/servicios.js'
import { useMoneda, MONEDAS } from '../context/MonedaContext.jsx'
import ServicioCard from '../components/ServicioCard.jsx'
import Reveal from '../components/Reveal.jsx'

export default function Servicios() {
  const { monedaActiva, setMonedaActiva } = useMoneda()

  return (
    <div className="pagina">
      <section className="seccion">
        <Reveal>
          <h1 className="seccion-titulo">Nuestros <span>Servicios</span></h1>
          <p className="seccion-intro">
            Conoce el catalogo completo de servicios tecnicos que ofrecemos.
            Cambia la moneda para ver los precios convertidos en tiempo real.
          </p>
        </Reveal>

        <Reveal>
          <div className="moneda-botones centro">
            {Object.keys(MONEDAS).map((key) => (
              <button
                key={key}
                className={`btn-moneda ${monedaActiva === key ? 'activa' : ''}`}
                onClick={() => setMonedaActiva(key)}
              >
                {MONEDAS[key].simbolo}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Recorrido del arreglo de servicios con .map() + animacion escalonada */}
        <div className="servicios-grid">
          {servicios.map((s, i) => (
            <Reveal key={s.id} delay={(i % 3) + 1}>
              <ServicioCard servicio={s} />
            </Reveal>
          ))}
        </div>

        <div className="centro">
          <Link to="/cotizar" className="btn btn-primario">Solicitar cotizacion</Link>
        </div>
      </section>
    </div>
  )
}
