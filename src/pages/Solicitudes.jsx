import { useState, useEffect } from 'react'
import TablaSolicitudes from '../components/TablaSolicitudes.jsx'
import FormularioSolicitud from '../components/FormularioSolicitud.jsx'
import {
  obtenerSolicitudes,
  actualizarSolicitud,
  eliminarSolicitud
} from '../utils/storage.js'

export default function Solicitudes() {
  const [solicitudes, setSolicitudes] = useState([])
  const [editando, setEditando] = useState(null)

  // READ inicial
  useEffect(() => {
    refrescar()
  }, [])

  function refrescar() {
    setSolicitudes(obtenerSolicitudes())
  }

  // UPDATE
  function handleGuardarEdicion(datos) {
    actualizarSolicitud(editando.id, datos)
    setEditando(null)
    refrescar()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // DELETE
  function handleEliminar(id) {
    if (window.confirm('¿Seguro que deseas eliminar esta solicitud?')) {
      eliminarSolicitud(id)
      refrescar()
    }
  }

  function handleEditar(solicitud) {
    setEditando(solicitud)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="pagina">
      <section className="seccion">
        <h1 className="seccion-titulo">Gestion de Solicitudes (CRUD)</h1>
        <p className="seccion-intro">
          Aqui puedes ver, editar y eliminar las solicitudes guardadas en LocalStorage.
          Los datos sensibles estan cifrados; usa el boton para alternar la vista.
        </p>

        {/* Modo edicion: muestra el formulario (manipulacion condicional de UI) */}
        {editando && (
          <FormularioSolicitud
            solicitudEditar={editando}
            onGuardar={handleGuardarEdicion}
            onCancelar={() => setEditando(null)}
          />
        )}

        <TablaSolicitudes
          solicitudes={solicitudes}
          onEditar={handleEditar}
          onEliminar={handleEliminar}
        />
      </section>
    </div>
  )
}
