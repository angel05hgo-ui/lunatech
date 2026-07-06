import { useMoneda } from '../context/MonedaContext.jsx'

export default function ServicioCard({ servicio, seleccionable = false, seleccionado = false, onToggle, onVerDetalles }) {
  const { formatearPrecio } = useMoneda()

  return (
    <div className={`servicio-card ${seleccionado ? 'seleccionado' : ''}`}>
      <div className="servicio-img-wrap">
        <img src={servicio.imagen} alt={servicio.nombre} loading="lazy" />
      </div>
      <div className="servicio-body">
        <h3>{servicio.nombre}</h3>
        <p>{servicio.descripcion}</p>
        <div className="servicio-footer">
          <span className="precio">{formatearPrecio(servicio.precioCLP)}</span>
          {seleccionable ? (
            <button
              className={`btn ${seleccionado ? 'btn-secundario' : 'btn-primario'}`}
              onClick={() => onToggle(servicio.id)}
            >
              {seleccionado ? 'Seleccionado' : 'Agregar'}
            </button>
          ) : onVerDetalles ? (
            <button className="btn btn-secundario" onClick={onVerDetalles}>
              Ver detalles
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}
