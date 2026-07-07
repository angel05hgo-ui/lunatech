import { useEffect, useState } from 'react'
import Reveal from '../components/Reveal.jsx'

const FRAMEWORKS = [
  { id: 'bootstrap', nombre: 'Bootstrap 5', color: '#7952b3', css: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css' },
  { id: 'materialize', nombre: 'Materialize CSS', color: '#ee6e73', css: 'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css' },
  { id: 'bulma', nombre: 'Bulma', color: '#00d1b2', css: 'https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css' },
]

function SeccionBootstrap() {
  const [abierto, setAbierto] = useState(null)
  const items = [
    { titulo: '1. Condiciones generales de uso', texto: 'El acceso y uso de los servicios ofrecidos por LunaTech implica la aceptacion plena de los presentes terminos. LunaTech se reserva el derecho de modificar estos terminos en cualquier momento, notificando a los usuarios a traves del sitio web.' },
    { titulo: '2. Responsabilidad del usuario', texto: 'El usuario se compromete a proporcionar informacion veridica y actualizada al momento de realizar una solicitud de cotizacion. LunaTech no se hace responsable de errores derivados de datos incorrectos ingresados por el usuario.' },
    { titulo: '3. Garantia del servicio', texto: 'Todos los servicios tecnicos cuentan con una garantia de 30 dias corridos desde la fecha de entrega del equipo. La garantia cubre exclusivamente fallas relacionadas con el servicio realizado.' },
  ]

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', color: 'var(--texto)' }}>
      <div className="d-flex align-items-center gap-3 mb-4">
        <span className="badge" style={{ background: '#7952b3', fontSize: '0.85rem', padding: '0.5rem 1rem', color: '#fff' }}>
          Bootstrap 5
        </span>
        <h2 className="h4 mb-0" style={{ color: 'var(--texto)' }}>Condiciones Generales</h2>
      </div>

      <div className="accordion" id="accordionTerminos">
        {items.map((item, i) => (
          <div className="accordion-item" key={i} style={{ background: 'var(--surface)', border: '1px solid var(--borde)' }}>
            <h2 className="accordion-header">
              <button
                className={`accordion-button ${abierto !== i ? 'collapsed' : ''}`}
                type="button"
                style={{
                  background: abierto === i ? 'var(--acento-bg)' : 'var(--surface)',
                  color: 'var(--texto)', fontWeight: 600,
                  boxShadow: 'none', border: 'none',
                }}
                onClick={() => setAbierto(abierto === i ? null : i)}
              >
                {item.titulo}
              </button>
            </h2>
            <div className={`accordion-collapse collapse ${abierto === i ? 'show' : ''}`}>
              <div className="accordion-body" style={{ color: 'var(--texto-2)', lineHeight: '1.7', background: 'var(--surface)' }}>
                {item.texto}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-3 mt-3">
        {[
          { titulo: 'Horario de atencion', texto: 'Lunes a viernes de 09:00 a 18:00 hrs. Sabados de 10:00 a 14:00 hrs.' },
          { titulo: 'Tiempo de respuesta', texto: 'Las solicitudes son respondidas dentro de las primeras 24 horas habiles.' },
          { titulo: 'Zona de cobertura', texto: 'Punta Arenas y alrededores. Puerto Natales con coordinacion previa.' },
        ].map((c, i) => (
          <div className="col-md-4" key={i}>
            <div className="card h-100" style={{ background: 'var(--surface)', border: '1px solid var(--borde)', boxShadow: 'none', borderRadius: 8 }}>
              <div className="card-body">
                <h6 className="card-title" style={{ color: '#7952b3' }}>{c.titulo}</h6>
                <p className="card-text small" style={{ color: 'var(--texto-2)' }}>{c.texto}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SeccionMaterialize() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', color: 'var(--texto)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <span style={{ background: '#ee6e73', color: '#fff', padding: '0.4rem 1rem', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 700 }}>
          Materialize CSS
        </span>
        <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: 'var(--texto)' }}>Politica de Privacidad</h2>
      </div>

      <div style={{ borderLeft: '4px solid #ee6e73', padding: '1.2rem 1.5rem', marginBottom: '1rem', borderRadius: '4px', background: 'var(--surface-2)', border: '1px solid var(--borde)' }}>
        <span style={{ color: '#ee6e73', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>Tratamiento de datos personales</span>
        <span style={{ color: 'var(--texto-2)', lineHeight: '1.7', fontSize: '0.9rem' }}>
          LunaTech recopila unicamente los datos necesarios para gestionar las solicitudes de servicio tecnico. Esta informacion se almacena de forma encriptada y no es compartida con terceros bajo ningun concepto.
        </span>
      </div>

      <div style={{ border: '1px solid var(--borde)', borderRadius: '4px', overflow: 'hidden' }}>
        {[
          { icono: '🔒', titulo: 'Datos cifrados', texto: 'Nombre, RUT, email y telefono se almacenan encriptados en el navegador del usuario.' },
          { icono: '📋', titulo: 'Uso limitado', texto: 'Los datos se usan exclusivamente para la gestion de solicitudes de servicio tecnico.' },
          { icono: '🗑', titulo: 'Derecho al olvido', texto: 'El usuario puede eliminar sus solicitudes y datos en cualquier momento desde la seccion Solicitudes.' },
          { icono: '🔄', titulo: 'Actualizacion', texto: 'Esta politica puede actualizarse. Se notificara a los usuarios mediante aviso en el sitio.' },
        ].map((item, i) => (
          <div key={i} style={{
            padding: '1rem 1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start',
            borderBottom: i < 3 ? '1px solid var(--borde)' : 'none', background: 'var(--surface)',
          }}>
            <span style={{ fontSize: '1.3rem' }}>{item.icono}</span>
            <div>
              <strong style={{ display: 'block', color: 'var(--texto)', marginBottom: '0.2rem', fontSize: '0.9rem' }}>{item.titulo}</strong>
              <span style={{ color: 'var(--texto-2)', fontSize: '0.85rem', lineHeight: '1.6' }}>{item.texto}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '1rem', padding: '1rem 1.5rem', background: 'var(--surface-2)', borderRadius: '4px', border: '1px solid var(--borde)' }}>
        <strong style={{ color: '#ee6e73', fontSize: '0.85rem' }}>Aviso importante: </strong>
        <span style={{ color: 'var(--texto-2)', fontSize: '0.85rem' }}>Al usar LunaTech, el usuario acepta esta politica de privacidad y el tratamiento de sus datos segun lo descrito.</span>
      </div>
    </div>
  )
}

function SeccionBulma() {
  const restricciones = [
    'Queda prohibido el uso del sitio para actividades ilegales o fraudulentas.',
    'No esta permitido intentar vulnerar la seguridad o integridad del sistema.',
    'El usuario no debe suplantar la identidad de otra persona al registrar una solicitud.',
    'Esta prohibido el uso automatizado del sitio mediante bots o scrapers.',
    'LunaTech se reserva el derecho de suspender el acceso ante uso indebido.',
  ]

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', color: 'var(--texto)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <span style={{ background: '#00d1b2', color: '#fff', padding: '0.4rem 1rem', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 700 }}>
          Bulma
        </span>
        <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: 'var(--texto)' }}>Restricciones de Uso</h2>
      </div>

      <div style={{ background: 'var(--surface-2)', border: '1px solid #00d1b2', borderRadius: '6px', padding: '1.2rem 1.5rem', marginBottom: '1.5rem' }}>
        <p style={{ margin: 0, color: '#00d1b2', fontWeight: 600, fontSize: '0.9rem' }}>
          El incumplimiento de cualquiera de estas restricciones puede resultar en la inhabilitacion permanente del acceso al servicio.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {restricciones.map((r, i) => (
          <div key={i} style={{ padding: '1rem 1.4rem', borderRadius: '6px', background: 'var(--surface)', border: '1px solid var(--borde)', boxShadow: 'var(--sombra-sm)', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <span style={{ background: 'rgba(204,15,53,0.12)', color: '#cc0f35', borderRadius: '4px', padding: '0.2rem 0.6rem', fontSize: '0.75rem', fontWeight: 700, flexShrink: 0 }}>
              Art. {i + 1}
            </span>
            <p style={{ margin: 0, color: 'var(--texto-2)', fontSize: '0.9rem', lineHeight: '1.6' }}>{r}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
        {[['Vigencia', 'Indefinida, sujeta a cambios'], ['Jurisdiccion', 'Punta Arenas, Chile'], ['Legislacion', 'Ley 19.628 Proteccion de datos']].map(([k, v]) => (
          <div key={k} style={{ flex: 1, minWidth: 180 }}>
            <div style={{ background: 'var(--surface-2)', borderRadius: '6px', padding: '1rem', textAlign: 'center', border: '1px solid var(--borde)' }}>
              <p style={{ fontWeight: 700, color: 'var(--texto)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 0.3rem' }}>{k}</p>
              <p style={{ color: 'var(--texto-2)', fontSize: '0.85rem', margin: 0 }}>{v}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Terminos() {
  const [tab, setTab] = useState(0)

  useEffect(() => {
    const links = FRAMEWORKS.map(({ id, css }) => {
      const el = document.createElement('link')
      el.id = `fw-${id}`
      el.rel = 'stylesheet'
      el.href = css
      document.head.appendChild(el)
      return el
    })
    return () => links.forEach((el) => el.remove())
  }, [])

  const SECCIONES = [SeccionBootstrap, SeccionMaterialize, SeccionBulma]
  const Seccion = SECCIONES[tab]

  return (
    <div className="pagina">
      <Reveal>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="hero-badge">Legal</span>
          <h1 className="seccion-titulo" style={{ marginTop: '1rem' }}>
            Terminos y <span>Condiciones</span>
          </h1>
          <p className="seccion-intro">
            Condiciones de uso, politica de privacidad y restricciones del sistema LunaTech.
            Presentado en tres frameworks CSS distintos.
          </p>
        </div>
      </Reveal>

      <Reveal delay={1}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {FRAMEWORKS.map((fw, i) => (
            <button
              key={fw.id}
              onClick={() => setTab(i)}
              style={{
                flex: 1, minWidth: 160, padding: '0.9rem 1.2rem', borderRadius: 10,
                border: tab === i ? `2px solid ${fw.color}` : '2px solid var(--borde)',
                background: tab === i ? `${fw.color}22` : 'var(--surface)',
                cursor: 'pointer', fontFamily: 'Sora, sans-serif', fontWeight: 700,
                fontSize: '0.88rem', color: tab === i ? fw.color : 'var(--texto-2)',
                transition: 'all .2s', boxShadow: tab === i ? `0 0 0 3px ${fw.color}22` : 'none',
              }}
            >
              {fw.nombre}
            </button>
          ))}
        </div>
      </Reveal>

      <Reveal>
        <div className="card" key={tab} style={{ animation: 'fadeIn .25s ease', borderTop: `3px solid ${FRAMEWORKS[tab].color}` }}>
          <Seccion />
        </div>
      </Reveal>

      <Reveal delay={1}>
        <p style={{ textAlign: 'center', color: 'var(--texto-3)', fontSize: '.8rem', marginTop: '2rem' }}>
          Ultima actualizacion: Julio 2026 — LunaTech, Punta Arenas, Chile.
        </p>
      </Reveal>
    </div>
  )
}
