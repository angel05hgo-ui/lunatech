import { useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'

const SECCIONES = [
  {
    titulo: 'Inicio',
    ruta: '/',
    contenido: [
      'La pagina de inicio presenta el hero principal con acceso rapido a cotizar y ver servicios.',
      'El selector de moneda permite cambiar entre CLP, UTM, UF, EUR y USD. Los precios se actualizan en tiempo real.',
      'El convertidor de divisas calcula el equivalente entre cualquier par de monedas usando la API de mindicador.cl.',
      'La seccion de servicios destacados muestra los 3 servicios mas solicitados con precio en la moneda seleccionada.',
      'Los testimonios de clientes se presentan en un carrusel automatico que avanza cada 5 segundos.',
    ],
  },
  {
    titulo: 'Servicios',
    ruta: '/servicios',
    contenido: [
      'Lista completa de los 8 servicios disponibles en LunaTech con imagen, descripcion y precio.',
      'Utiliza los botones de moneda para ver todos los precios convertidos instantaneamente.',
      'Haz clic en "Ver detalles" sobre cualquier servicio para abrir un modal con informacion completa.',
      'El boton "Solicitar cotizacion" redirige al formulario de cotizacion.',
    ],
  },
  {
    titulo: 'Cotizar',
    ruta: '/cotizar',
    contenido: [
      'Completa todos los campos obligatorios: nombre, RUT, email, telefono, direccion y fecha de nacimiento.',
      'El RUT se valida automaticamente verificando formato y digito verificador.',
      'La edad se calcula automaticamente desde la fecha de nacimiento. Debe ser mayor de 18 años.',
      'Selecciona uno o mas servicios haciendo clic en "Agregar". El total se actualiza en tiempo real.',
      'Al hacer clic en "Registrar solicitud", los datos sensibles se guardan encriptados en LocalStorage.',
    ],
  },
  {
    titulo: 'Solicitudes',
    ruta: '/solicitudes',
    contenido: [
      'Muestra todas las solicitudes registradas en una tabla con nombre, RUT, email, edad, servicios y total.',
      'El boton "Ver datos encriptados" alterna entre los datos legibles y su version cifrada en LocalStorage.',
      'El icono de edicion abre el formulario pre-cargado con los datos de esa solicitud para modificarlos.',
      'El icono de eliminacion borra la solicitud permanentemente del almacenamiento local.',
    ],
  },
  {
    titulo: 'Diagramas',
    ruta: '/diagramas',
    contenido: [
      'Diagrama de Clases UML: muestra las 4 entidades principales (MonedaContext, Servicio, ServicioCard, Solicitud) con atributos, metodos y relaciones.',
      'Haz hover sobre una clase para resaltar sus relaciones. Haz clic para ver su descripcion detallada.',
      'Diagrama de Casos de Uso UML: muestra al actor Cliente y los 7 casos de uso del sistema con relaciones include y extend.',
      'Haz clic en cualquier caso de uso para ver su descripcion funcional.',
    ],
  },
  {
    titulo: 'Terminos y Condiciones',
    ruta: '/terminos',
    contenido: [
      'Pagina que presenta los terminos de uso de LunaTech en tres estilos de frameworks CSS distintos.',
      'Seccion Bootstrap: muestra las condiciones generales usando componentes de Bootstrap 5.',
      'Seccion Materialize: presenta la politica de privacidad con estilos de Materialize CSS.',
      'Seccion Bulma: muestra las restricciones de uso utilizando el framework Bulma.',
    ],
  },
]

function ItemAcordeon({ seccion, abierto, onToggle }) {
  return (
    <div className={`acordeon-item ${abierto ? 'abierto' : ''}`}>
      <button className="acordeon-btn" onClick={onToggle} aria-expanded={abierto}>
        <span className="acordeon-titulo">{seccion.titulo}</span>
        <Link
          to={seccion.ruta}
          className="acordeon-link"
          onClick={(e) => e.stopPropagation()}
        >
          Ir a la pagina
        </Link>
        <span className="acordeon-icono">{abierto ? '−' : '+'}</span>
      </button>
      <div className="acordeon-contenido" style={{ maxHeight: abierto ? '400px' : '0' }}>
        <ul className="acordeon-lista">
          {seccion.contenido.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function Manual() {
  const [abierto, setAbierto] = useState(0)

  const toggle = (i) => setAbierto((prev) => (prev === i ? null : i))

  return (
    <div className="pagina">
      <Reveal>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="hero-badge">Documentacion</span>
          <h1 className="seccion-titulo" style={{ marginTop: '1rem' }}>
            Manual de <span>Usuario</span>
          </h1>
          <p className="seccion-intro">
            Guia completa de uso del sistema LunaTech. Selecciona una seccion para expandir sus instrucciones.
          </p>
        </div>
      </Reveal>

      <Reveal delay={1}>
        <div className="acordeon">
          {SECCIONES.map((s, i) => (
            <ItemAcordeon
              key={i}
              seccion={s}
              abierto={abierto === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>
      </Reveal>

      <Reveal delay={2}>
        <div className="card" style={{ marginTop: '3rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
          <div style={{ flexShrink: 0 }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="11" stroke="var(--acento)" strokeWidth="1.5" fill="var(--acento-bg)"/>
              <path d="M12 8v4m0 4h.01" stroke="var(--acento)" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <strong style={{ display: 'block', marginBottom: '.4rem', fontFamily: 'Sora, sans-serif' }}>
              Requisitos del sistema
            </strong>
            <p style={{ color: 'var(--texto-2)', fontSize: '.9rem', lineHeight: 1.7, margin: 0 }}>
              LunaTech funciona en cualquier navegador moderno (Chrome, Firefox, Edge, Safari).
              Los datos se almacenan localmente en el navegador mediante LocalStorage con encriptacion.
              Se requiere conexion a internet para cargar los indicadores economicos desde mindicador.cl.
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  )
}
