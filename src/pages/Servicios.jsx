import { useState } from 'react'
import { Link } from 'react-router-dom'
import { servicios } from '../data/servicios.js'
import { useMoneda, MONEDAS } from '../context/MonedaContext.jsx'
import ServicioCard from '../components/ServicioCard.jsx'
import Reveal from '../components/Reveal.jsx'
import Modal from '../components/Modal.jsx'

export default function Servicios() {
  const { monedaActiva, setMonedaActiva, formatearPrecio } = useMoneda()
  const [modalServicio, setModalServicio] = useState(null)

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

        <div className="servicios-grid">
          {servicios.map((s, i) => (
            <Reveal key={s.id} delay={(i % 3) + 1}>
              <ServicioCard servicio={s} onVerDetalles={() => setModalServicio(s)} />
            </Reveal>
          ))}
        </div>

        <div className="centro">
          <Link to="/cotizar" className="btn btn-primario">Solicitar cotizacion</Link>
        </div>
      </section>

      {/* Modal de detalles */}
      <Modal abierto={!!modalServicio} onCerrar={() => setModalServicio(null)}>
        {modalServicio && (
          <>
            <img
              src={modalServicio.imagen}
              alt={modalServicio.nombre}
              className="modal-img"
            />
            <span className="modal-badge">{modalServicio.categoria || 'Servicio tecnico'}</span>
            <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: '1.25rem', marginBottom: '.5rem' }}>
              {modalServicio.nombre}
            </h2>
            <p style={{ color: 'var(--texto-2)', fontSize: '.92rem', lineHeight: 1.7, marginBottom: '.5rem' }}>
              {modalServicio.descripcion}
            </p>
            <div className="modal-precio">{formatearPrecio(modalServicio.precioCLP)}</div>
            <Link
              to="/cotizar"
              className="btn btn-primario"
              style={{ width: '100%', textAlign: 'center', display: 'block' }}
              onClick={() => setModalServicio(null)}
            >
              Solicitar este servicio
            </Link>
          </>
        )}
      </Modal>
    </div>
  )
}
