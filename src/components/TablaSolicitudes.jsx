import { useState } from 'react'
import { servicios } from '../data/servicios.js'
import { useMoneda } from '../context/MonedaContext.jsx'
import { obtenerSolicitudesCifradas } from '../utils/storage.js'

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
                    <button className="btn-icono editar" onClick={() => onEditar(s)} title="Editar">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    </button>
                    <button className="btn-icono eliminar" onClick={() => onEliminar(s.id)} title="Eliminar">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                        <path d="M10 11v6M14 11v6"/>
                        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                      </svg>
                    </button>
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
