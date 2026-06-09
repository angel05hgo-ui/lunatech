import { useState } from 'react'
import { servicios } from '../data/servicios.js'
import { useMoneda } from '../context/MonedaContext.jsx'
import { obtenerSolicitudesCifradas } from '../utils/storage.js'

// Tabla que lista las solicitudes (READ del CRUD) con acciones editar/eliminar.
export default function TablaSolicitudes({ solicitudes, onEditar, onEliminar }) {
  const { formatearPrecio } = useMoneda()
  const [verCifrado, setVerCifrado] = useState(false)

  function nombresServicios(ids) {
    return ids
      .map((id) => servicios.find((s) => s.id === id)?.nombre)
      .filter(Boolean)
      .join(', ')
  }

  if (!solicitudes.length) {
    return (
      <div className="card vacio">
        <p>No hay solicitudes registradas todavia.</p>
      </div>
    )
  }

  const cifradas = obtenerSolicitudesCifradas()

  return (
    <div className="card">
      <div className="tabla-header">
        <h2>Solicitudes registradas ({solicitudes.length})</h2>
        <button className="btn btn-secundario" onClick={() => setVerCifrado((v) => !v)}>
          {verCifrado ? 'Ver datos legibles' : 'Ver datos encriptados'}
        </button>
      </div>

      <div className="tabla-scroll">
        <table className="tabla">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>RUT</th>
              <th>Email</th>
              <th>Edad</th>
              <th>Servicios</th>
              <th>Total</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {solicitudes.map((s, i) => {
              const c = cifradas[i] || {}
              return (
                <tr key={s.id}>
                  <td>{verCifrado ? <code className="cifrado">{c.nombre}</code> : s.nombre}</td>
                  <td>{verCifrado ? <code className="cifrado">{c.rut}</code> : s.rut}</td>
                  <td>{verCifrado ? <code className="cifrado">{c.email}</code> : s.email}</td>
                  <td>{s.edad} años</td>
                  <td className="td-servicios">{nombresServicios(s.servicios || [])}</td>
                  <td>{formatearPrecio(s.totalCLP || 0)}</td>
                  <td>{s.fechaRegistro}</td>
                  <td className="td-acciones">
                    <button className="btn-icono editar" onClick={() => onEditar(s)} title="Editar">✏️</button>
                    <button className="btn-icono eliminar" onClick={() => onEliminar(s.id)} title="Eliminar">🗑️</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
