import { useMoneda } from '../context/MonedaContext.jsx'

// Tarjeta de servicio. Muestra imagen, nombre, descripcion y precio dinamico.
// Si recibe props de seleccion, permite seleccionar el servicio (cotizacion).
export default function ServicioCard({ servicio, seleccionable = false, seleccionado = false, onToggle }) {
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
          {seleccionable && (
            <button
              className={`btn ${seleccionado ? 'btn-secundario' : 'btn-primario'}`}
              onClick={() => onToggle(servicio.id)}
            >
              {seleccionado ? 'Seleccionado' : 'Agregar'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
