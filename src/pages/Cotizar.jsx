import { useState } from 'react'
import { Link } from 'react-router-dom'
import FormularioSolicitud from '../components/FormularioSolicitud.jsx'
import { crearSolicitud } from '../utils/storage.js'

export default function Cotizar() {
  const [exito, setExito] = useState(false)

  function handleGuardar(datos) {
    crearSolicitud(datos)
    setExito(true)
    // Oculta el mensaje luego de unos segundos (manipulacion de UI)
    setTimeout(() => setExito(false), 5000)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="pagina">
      <section className="seccion">
        <h1 className="seccion-titulo">Cotiza tu servicio</h1>
        <p className="seccion-intro">
          Completa el formulario, selecciona los servicios que necesitas y registra tu solicitud.
          Tus datos sensibles se guardan encriptados de forma segura.
        </p>

        {exito && (
          <div className="alerta-exito">
            ✓ Tu solicitud fue registrada correctamente. Puedes verla en la seccion{' '}
            <Link to="/solicitudes">Solicitudes</Link>.
          </div>
        )}

        <FormularioSolicitud onGuardar={handleGuardar} />
      </section>
    </div>
  )
}
