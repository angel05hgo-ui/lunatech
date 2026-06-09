import { useState } from 'react'

// ─────────────────────────────────────────────
// DATOS — DIAGRAMA DE CLASES
// ─────────────────────────────────────────────
const TEMA = {
  context:    { hdr: '#7c3aed', bg: '#faf5ff', brd: '#7c3aed', tx: '#4c1d95' },
  modelo:     { hdr: '#1d4ed8', bg: '#eff6ff', brd: '#1d4ed8', tx: '#1e3a8a' },
  componente: { hdr: '#047857', bg: '#ecfdf5', brd: '#047857', tx: '#064e3b' },
}

const CLASES = [
  {
    id: 'ctx', tipo: 'context',
    estereo: '«context»', nombre: 'MonedaContext',
    attrs: ['monedaActiva : string', 'MONEDAS : Object'],
    mets:  ['formatearPrecio(clp) : string', 'setMonedaActiva(key) : void'],
    x: 30, y: 30, w: 240,
    desc: 'Contexto global de React que gestiona la moneda activa y expone funciones de formateo de precios a todos los componentes de la aplicación mediante el hook useMoneda().',
  },
  {
    id: 'srv', tipo: 'modelo',
    estereo: '«modelo»', nombre: 'Servicio',
    attrs: ['id : number', 'nombre : string', 'descripcion : string', 'precioCLP : number', 'imagen : string', 'icono : string'],
    mets: [],
    x: 630, y: 30, w: 240,
    desc: 'Entidad de datos que define un servicio técnico ofrecido por LunaTech. El precio base está en CLP y se convierte dinámicamente según la moneda seleccionada.',
  },
  {
    id: 'card', tipo: 'componente',
    estereo: '«componente»', nombre: 'ServicioCard',
    attrs: ['servicio : Servicio', 'seleccionable : boolean', 'seleccionado : boolean'],
    mets:  ['onToggle(id : number) : void', 'render() : JSX.Element'],
    x: 30, y: 405, w: 240,
    desc: 'Componente React que renderiza la tarjeta visual de un servicio: imagen con overlay, descripción, precio dinámico en la moneda activa y botón de selección para cotizar.',
  },
  {
    id: 'sol', tipo: 'modelo',
    estereo: '«modelo»', nombre: 'Solicitud',
    attrs: ['nombre : string', 'apellido : string', 'email : string', 'edad : number', 'servicios : Servicio[]', 'total : number', 'moneda : string', 'fecha : Date'],
    mets: [],
    x: 630, y: 405, w: 240,
    desc: 'Modelo de datos de una cotización enviada. Vincula la información personal del cliente con los servicios seleccionados, el total calculado y la moneda utilizada.',
  },
]

function getH(cls) {
  const R = 22, HDR = 48, PAD = 18
  const divH = cls.mets.length > 0 ? 10 : 0
  return HDR + cls.attrs.length * R + divH + cls.mets.length * R + PAD
}

// ─────────────────────────────────────────────
// CAJA SVG DE CLASE UML
// ─────────────────────────────────────────────
function ClaseBox({ cls, hovered, onEnter, onLeave, onClick, selected }) {
  const t = TEMA[cls.tipo]
  const h = getH(cls)
  const isHov = hovered === cls.id
  const isSel = selected === cls.id
  const R = 22, HDR = 48

  return (
    <g
      transform={`translate(${cls.x},${cls.y})`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      {/* Halo de brillo */}
      {(isHov || isSel) && (
        <rect x={-8} y={-8} width={cls.w + 16} height={h + 16} rx={16}
          fill={t.bg} opacity={0.6}
          style={{ filter: 'blur(10px)' }} />
      )}
      {/* Sombra */}
      <rect x={3} y={5} width={cls.w} height={h} rx={10}
        fill="rgba(0,0,0,0.07)" style={{ filter: 'blur(6px)' }} />

      {/* Cuerpo */}
      <rect width={cls.w} height={h} rx={10}
        fill="var(--surface, #fff)"
        stroke={isSel ? t.hdr : isHov ? t.hdr : 'var(--borde, #e4e4e7)'}
        strokeWidth={isSel ? 2.5 : isHov ? 2 : 1.5}
      />

      {/* Encabezado */}
      <rect width={cls.w} height={HDR} rx={10} fill={t.hdr} />
      <rect y={HDR - 10} width={cls.w} height={10} fill={t.hdr} />

      {/* Estereotipo */}
      <text x={cls.w / 2} y={17} textAnchor="middle"
        fill="rgba(255,255,255,0.7)" fontSize={10}
        fontStyle="italic" fontFamily="Inter, sans-serif">
        {cls.estereo}
      </text>

      {/* Nombre */}
      <text x={cls.w / 2} y={38} textAnchor="middle"
        fill="#fff" fontSize={14} fontWeight="700" fontFamily="Sora, sans-serif">
        {cls.nombre}
      </text>

      {/* Atributos */}
      {cls.attrs.map((a, i) => (
        <text key={i} x={14} y={HDR + 16 + i * R}
          fontSize={10.5} fontFamily="monospace"
          fill={isHov || isSel ? t.tx : 'var(--texto-2, #52525b)'}>
          <tspan fill={t.hdr} fontSize={9}>▪ </tspan>{a}
        </text>
      ))}

      {/* Separador */}
      {cls.mets.length > 0 && (
        <line
          x1={10} y1={HDR + cls.attrs.length * R + 5}
          x2={cls.w - 10} y2={HDR + cls.attrs.length * R + 5}
          stroke={t.hdr} strokeWidth={1} opacity={0.3}
        />
      )}

      {/* Métodos */}
      {cls.mets.map((m, i) => (
        <text key={i} x={14}
          y={HDR + cls.attrs.length * R + (cls.mets.length > 0 ? 16 : 6) + i * R}
          fontSize={10.5} fontFamily="monospace"
          fill={isHov || isSel ? t.tx : 'var(--texto-2, #52525b)'}>
          <tspan fill={t.hdr} fontSize={9}>▸ </tspan>{m}
        </text>
      ))}
    </g>
  )
}

// ─────────────────────────────────────────────
// DIAGRAMA DE CLASES COMPLETO
// ─────────────────────────────────────────────
function DiagramaClases() {
  const [hov, setHov] = useState(null)
  const [sel, setSel] = useState(null)

  const [ctx, srv, card, sol] = CLASES

  const hCtx  = getH(ctx)   // 48+44+10+44+18 = 164
  const hSrv  = getH(srv)   // 48+132+0+0+18  = 198
  const hCard = getH(card)  // 48+66+10+44+18 = 186
  const hSol  = getH(sol)   // 48+176+0+0+18  = 242

  // Puntos clave
  const p = {
    ctxBotX:  ctx.x  + ctx.w / 2,        // 150
    ctxBotY:  ctx.y  + hCtx,             // 194
    ctxRgtX:  ctx.x  + ctx.w,            // 270
    ctxCtrY:  ctx.y  + hCtx / 2,         // 112

    srvLftX:  srv.x,                      // 630
    srvCtrY:  srv.y  + hSrv / 2,         // 129
    srvBotX:  srv.x  + srv.w / 2,        // 750
    srvBotY:  srv.y  + hSrv,             // 228

    cardTopX: card.x + card.w / 2,       // 150
    cardTopY: card.y,                     // 405
    cardRgtX: card.x + card.w,           // 270
    cardCtrY: card.y + hCard / 2,        // 498

    solTopX:  sol.x  + sol.w / 2,        // 750
    solTopY:  sol.y,                      // 405
    solLftX:  sol.x,                      // 630
    solCtrY:  sol.y  + hSol / 2,         // 526
  }

  const dim = (a, b) =>
    hov && hov !== a && hov !== b ? 0.12 : 1

  const midY1 = (p.ctxBotY + p.cardTopY) / 2  // 299.5
  const midY3 = (p.srvBotY + p.solTopY)  / 2  // 316.5
  const midCurveY = (p.cardCtrY + p.srvCtrY) / 2 // 313.5

  const selCls = sel ? CLASES.find(c => c.id === sel) : null

  return (
    <div>
      {/* Leyenda */}
      <div style={{ display: 'flex', gap: '1.2rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        {Object.entries(TEMA).map(([tipo, col]) => (
          <span key={tipo} style={{ display: 'flex', alignItems: 'center', gap: '.4rem', fontSize: '.82rem', color: 'var(--texto-2)' }}>
            <span style={{ width: 12, height: 12, borderRadius: 3, background: col.hdr, display: 'inline-block' }} />
            {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
          </span>
        ))}
        <span style={{ marginLeft: 'auto', fontSize: '.8rem', color: 'var(--texto-3)' }}>
          Hover para resaltar relaciones · Clic para ver descripción
        </span>
      </div>

      <svg
        viewBox="0 0 900 672"
        style={{ width: '100%', borderRadius: 14, border: '1px solid var(--borde)', overflow: 'visible', display: 'block' }}
        onMouseLeave={() => setHov(null)}
      >
        <defs>
          <pattern id="dcDots" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="var(--borde, #e4e4e7)" />
          </pattern>
          {/* Flecha genérica */}
          <marker id="arrG" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto">
            <path d="M0,0 L0,7 L9,3.5 z" fill="#94a3b8" />
          </marker>
          {/* Flecha violeta */}
          <marker id="arrV" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto">
            <path d="M0,0 L0,7 L9,3.5 z" fill="#7c3aed" />
          </marker>
          {/* Flecha azul */}
          <marker id="arrB" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto">
            <path d="M0,0 L0,7 L9,3.5 z" fill="#1d4ed8" />
          </marker>
        </defs>

        {/* Fondo punteado */}
        <rect width="900" height="672" fill="var(--surface, #fff)" />
        <rect width="900" height="672" fill="url(#dcDots)" />

        {/* ── Relación 1: MonedaContext ──usa──▶ ServicioCard (vertical, violeta) ── */}
        <line
          x1={p.ctxBotX} y1={p.ctxBotY + 2}
          x2={p.cardTopX} y2={p.cardTopY - 8}
          stroke="#7c3aed" strokeWidth={1.8} strokeDasharray="8,5"
          markerEnd="url(#arrV)"
          opacity={dim('ctx','card')}
          style={{ transition: 'opacity .3s' }}
        />
        <rect x={p.ctxBotX - 22} y={midY1 - 11} width={44} height={20} rx={5}
          fill="var(--surface,#fff)" stroke="#7c3aed" strokeWidth={1}
          opacity={dim('ctx','card')} style={{ transition: 'opacity .3s' }} />
        <text x={p.ctxBotX} y={midY1 + 4}
          textAnchor="middle" fontSize={10} fill="#7c3aed"
          fontStyle="italic" fontFamily="Inter,sans-serif"
          opacity={dim('ctx','card')} style={{ transition: 'opacity .3s' }}>
          usa
        </text>

        {/* ── Relación 2: ServicioCard ──muestra──▶ Servicio (curva, azul) ── */}
        <path
          d={`M ${p.cardRgtX + 2} ${p.cardCtrY} C 450 ${p.cardCtrY} 450 ${p.srvCtrY} ${p.srvLftX - 2} ${p.srvCtrY}`}
          fill="none" stroke="#1d4ed8" strokeWidth={1.8} strokeDasharray="8,5"
          markerEnd="url(#arrB)"
          opacity={dim('card','srv')}
          style={{ transition: 'opacity .3s' }}
        />
        <rect x={432} y={midCurveY - 12} width={66} height={20} rx={5}
          fill="var(--surface,#fff)" stroke="#1d4ed8" strokeWidth={1}
          opacity={dim('card','srv')} style={{ transition: 'opacity .3s' }} />
        <text x={465} y={midCurveY + 3}
          textAnchor="middle" fontSize={10} fill="#1d4ed8"
          fontStyle="italic" fontFamily="Inter,sans-serif"
          opacity={dim('card','srv')} style={{ transition: 'opacity .3s' }}>
          muestra
        </text>

        {/* ── Relación 3: Solicitud ◇──contiene──▶ Servicio (vertical, gris) ── */}
        <line
          x1={p.srvBotX} y1={p.srvBotY + 14}
          x2={p.solTopX} y2={p.solTopY - 2}
          stroke="#64748b" strokeWidth={1.8}
          markerEnd="url(#arrG)"
          opacity={dim('srv','sol')}
          style={{ transition: 'opacity .3s' }}
        />
        {/* Diamante de agregación */}
        <polygon
          points={`${p.srvBotX},${p.srvBotY + 16} ${p.srvBotX - 10},${p.srvBotY + 7} ${p.srvBotX},${p.srvBotY - 2} ${p.srvBotX + 10},${p.srvBotY + 7}`}
          fill="var(--surface,#fff)" stroke="#64748b" strokeWidth={1.5}
          opacity={dim('srv','sol')} style={{ transition: 'opacity .3s' }} />
        <rect x={p.solTopX + 14} y={midY3 - 12} width={82} height={20} rx={5}
          fill="var(--surface,#fff)" stroke="#94a3b8" strokeWidth={1}
          opacity={dim('srv','sol')} style={{ transition: 'opacity .3s' }} />
        <text x={p.solTopX + 55} y={midY3 + 3}
          textAnchor="middle" fontSize={10} fill="#64748b"
          fontStyle="italic" fontFamily="Inter,sans-serif"
          opacity={dim('srv','sol')} style={{ transition: 'opacity .3s' }}>
          contiene [ ]
        </text>

        {/* ── Cajas encima de todo ── */}
        {CLASES.map(cls => (
          <ClaseBox
            key={cls.id} cls={cls}
            hovered={hov} selected={sel}
            onEnter={() => setHov(cls.id)}
            onLeave={() => setHov(null)}
            onClick={() => setSel(p => p === cls.id ? null : cls.id)}
          />
        ))}
      </svg>

      {/* Panel de descripción */}
      <div style={{ minHeight: 76, marginTop: '1rem' }}>
        {selCls ? (
          <div style={{
            padding: '1.1rem 1.4rem',
            background: 'var(--acento-bg)', border: '1.5px solid var(--acento)',
            borderRadius: 10, animation: 'fadeIn .2s ease',
            display: 'flex', gap: '1rem', alignItems: 'flex-start',
          }}>
            <span style={{
              flexShrink: 0, padding: '.25rem .8rem', borderRadius: 20, fontSize: '.75rem', fontWeight: 700,
              background: TEMA[selCls.tipo].hdr, color: '#fff', marginTop: 2,
            }}>{selCls.estereo}</span>
            <div>
              <strong style={{ color: 'var(--acento)', fontFamily: 'Sora,sans-serif', display: 'block', marginBottom: '.3rem' }}>
                {selCls.nombre}
              </strong>
              <p style={{ color: 'var(--texto-2)', fontSize: '.88rem', lineHeight: 1.7, margin: 0 }}>
                {selCls.desc}
              </p>
            </div>
          </div>
        ) : (
          <p style={{ color: 'var(--texto-3)', fontSize: '.85rem', textAlign: 'center', paddingTop: '.6rem' }}>
            Haz clic en una clase para ver su descripción detallada
          </p>
        )}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// DATOS — DIAGRAMA DE CASOS DE USO
// ─────────────────────────────────────────────
const CU = [
  { id: 'uc1', label: ['Ver servicios', 'disponibles'],    cx: 340, cy: 80,  rx: 108, ry: 27, color: '#1d4ed8', desc: 'El cliente navega a la sección de servicios y visualiza la lista completa de servicios técnicos con imagen, descripción y precio en la moneda elegida.' },
  { id: 'uc2', label: ['Seleccionar moneda'],              cx: 340, cy: 175, rx: 100, ry: 27, color: '#7c3aed', desc: 'El cliente elige la moneda de visualización: CLP, USD, EUR o UF. Todos los precios de la aplicación se actualizan de forma dinámica e instantánea.' },
  { id: 'uc3', label: ['Convertir divisas'],               cx: 340, cy: 270, rx: 95,  ry: 27, color: '#7c3aed', desc: 'El cliente ingresa un monto en una moneda y selecciona la moneda de destino para obtener la conversión usando las tasas del mindicador.cl.' },
  { id: 'uc4', label: ['Cotizar servicio'],                cx: 340, cy: 370, rx: 95,  ry: 27, color: '#047857', desc: 'El cliente selecciona uno o más servicios de la lista para generar una cotización. El total se calcula automáticamente en la moneda activa.' },
  { id: 'uc5', label: ['Ver solicitudes'],                 cx: 660, cy: 140, rx: 95,  ry: 27, color: '#1d4ed8', desc: 'El cliente consulta el historial completo de todas las cotizaciones enviadas, con detalles del cliente, servicios y total.' },
  { id: 'uc6', label: ['Eliminar solicitud'],              cx: 660, cy: 255, rx: 100, ry: 27, color: '#dc2626', desc: 'El cliente puede eliminar una cotización del historial. La acción es irreversible y actualiza la tabla en tiempo real.' },
  { id: 'uc7', label: ['Llenar formulario', 'de solicitud'], cx: 660, cy: 375, rx: 108, ry: 27, color: '#047857', desc: 'El cliente completa sus datos personales: nombre, apellido, correo electrónico y fecha de nacimiento. El sistema calcula automáticamente su edad.' },
]

const RELATIONS_CU = [
  { from: 'uc4', to: 'uc7', tipo: 'include', label: '«include»' },
  { from: 'uc6', to: 'uc5', tipo: 'extend',  label: '«extend»'  },
]

const ACT = { cx: 65, cy: 230 }

function lineToEllipse(ax, ay, cx, cy, rx, ry) {
  const dx = cx - ax, dy = cy - ay
  const angle = Math.atan2(dy, dx)
  const ex = cx - rx * Math.cos(angle)
  const ey = cy - ry * Math.sin(angle)
  return { x: ex, y: ey }
}

// ─────────────────────────────────────────────
// DIAGRAMA DE CASOS DE USO COMPLETO
// ─────────────────────────────────────────────
function DiagramaCasosUso() {
  const [hov, setHov] = useState(null)
  const [sel, setSel] = useState(null)

  const selCU = sel ? CU.find(c => c.id === sel) : null

  const ucMap = {}
  CU.forEach(u => { ucMap[u.id] = u })

  return (
    <div>
      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap' }}>
          {[['#1d4ed8','Consulta'],['#7c3aed','Configuración'],['#047857','Cotización'],['#dc2626','Gestión']].map(([c,l]) => (
            <span key={l} style={{ display:'flex',alignItems:'center',gap:'.4rem',fontSize:'.82rem',color:'var(--texto-2)' }}>
              <span style={{ width:12,height:12,borderRadius:3,background:c,display:'inline-block' }} />{l}
            </span>
          ))}
        </div>
        <span style={{ marginLeft:'auto',fontSize:'.8rem',color:'var(--texto-3)' }}>
          Hover para ver relaciones · Clic para descripción
        </span>
      </div>

      <svg viewBox="0 0 860 480" style={{ width:'100%', borderRadius:14, border:'1px solid var(--borde)', display:'block', overflow:'visible' }}>
        <defs>
          <pattern id="cuDots" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="var(--borde, #e4e4e7)" />
          </pattern>
          <marker id="cuArr" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto">
            <path d="M0,0 L0,7 L9,3.5 z" fill="#94a3b8" />
          </marker>
          <marker id="cuArrInc" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto">
            <path d="M0,0 L7,3.5 L0,7" fill="none" stroke="#047857" strokeWidth="1.5"/>
          </marker>
          <marker id="cuArrExt" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto">
            <path d="M0,0 L7,3.5 L0,7" fill="none" stroke="#7c3aed" strokeWidth="1.5"/>
          </marker>
        </defs>

        {/* Fondo */}
        <rect width="860" height="480" fill="var(--surface,#fff)" />
        <rect width="860" height="480" fill="url(#cuDots)" />

        {/* Contorno del sistema */}
        <rect x={130} y={18} width={710} height={444} rx={14}
          fill="var(--acento-bg,#eff6ff)" fillOpacity={0.35}
          stroke="var(--acento,#2563eb)" strokeWidth={1.5} strokeDasharray="10,5" />
        <text x={486} y={40} textAnchor="middle"
          fontSize={12} fontWeight={700} fill="var(--acento,#2563eb)"
          fontFamily="Sora, sans-serif" letterSpacing={1}>
          SISTEMA: LUNATECH
        </text>

        {/* ── Líneas Actor → Casos de uso ── */}
        {CU.map(uc => {
          const ep = lineToEllipse(ACT.cx, ACT.cy, uc.cx, uc.cy, uc.rx + 2, uc.cy < ACT.cy ? uc.ry * 0.6 : uc.ry * 0.8)
          const isHov = hov === uc.id
          return (
            <line key={uc.id}
              x1={ACT.cx + 22} y1={ACT.cy}
              x2={ep.x} y2={ep.y}
              stroke={isHov ? uc.color : '#94a3b8'}
              strokeWidth={isHov ? 2 : 1.2}
              markerEnd="url(#cuArr)"
              opacity={hov && !isHov ? 0.15 : 1}
              style={{ transition: 'all .25s' }}
            />
          )
        })}

        {/* ── Relaciones include / extend ── */}
        {RELATIONS_CU.map(rel => {
          const fromU = ucMap[rel.from]
          const toU   = ucMap[rel.to]
          const isInc = rel.tipo === 'include'
          const color = isInc ? '#047857' : '#7c3aed'
          const midX  = (fromU.cx + toU.cx) / 2
          const midY  = (fromU.cy + toU.cy) / 2
          return (
            <g key={rel.from + rel.to}>
              <line
                x1={fromU.cx} y1={isInc ? fromU.cy - fromU.ry : fromU.cy + fromU.ry}
                x2={toU.cx}   y2={isInc ? toU.cy + toU.ry    : toU.cy - toU.ry}
                stroke={color} strokeWidth={1.5} strokeDasharray="6,4"
                markerEnd={isInc ? 'url(#cuArrInc)' : 'url(#cuArrExt)'}
              />
              <rect x={midX - 28} y={midY - 11} width={56} height={20} rx={5}
                fill="var(--surface,#fff)" stroke={color} strokeWidth={1} />
              <text x={midX} y={midY + 4} textAnchor="middle"
                fontSize={10} fill={color} fontStyle="italic" fontFamily="Inter,sans-serif">
                {rel.label}
              </text>
            </g>
          )
        })}

        {/* ── Casos de uso (elipses) ── */}
        {CU.map(uc => {
          const isHov = hov === uc.id
          const isSel = sel === uc.id
          return (
            <g key={uc.id}
              onMouseEnter={() => setHov(uc.id)}
              onMouseLeave={() => setHov(null)}
              onClick={() => setSel(p => p === uc.id ? null : uc.id)}
              style={{ cursor: 'pointer' }}
            >
              {/* Brillo hover */}
              {(isHov || isSel) && (
                <ellipse cx={uc.cx} cy={uc.cy} rx={uc.rx + 10} ry={uc.ry + 10}
                  fill={uc.color} opacity={0.12} style={{ filter: 'blur(8px)' }} />
              )}
              {/* Sombra */}
              <ellipse cx={uc.cx + 2} cy={uc.cy + 4} rx={uc.rx} ry={uc.ry}
                fill="rgba(0,0,0,0.07)" style={{ filter: 'blur(4px)' }} />
              {/* Elipse principal */}
              <ellipse cx={uc.cx} cy={uc.cy} rx={uc.rx} ry={uc.ry}
                fill={isHov || isSel ? uc.color : 'var(--surface,#fff)'}
                stroke={uc.color} strokeWidth={isHov || isSel ? 2 : 1.5}
                style={{ transition: 'fill .25s, stroke-width .25s' }}
              />
              {/* Texto (una o dos líneas) */}
              {uc.label.length === 1 ? (
                <text cx={uc.cx} cy={uc.cy} x={uc.cx} y={uc.cy + 4}
                  textAnchor="middle" fontSize={11.5} fontFamily="Inter,sans-serif"
                  fontWeight={600} fill={isHov || isSel ? '#fff' : 'var(--texto,#09090b)'}
                  style={{ transition: 'fill .25s' }}>
                  {uc.label[0]}
                </text>
              ) : (
                <>
                  <text x={uc.cx} y={uc.cy - 5} textAnchor="middle"
                    fontSize={11.5} fontFamily="Inter,sans-serif" fontWeight={600}
                    fill={isHov || isSel ? '#fff' : 'var(--texto,#09090b)'}
                    style={{ transition: 'fill .25s' }}>
                    {uc.label[0]}
                  </text>
                  <text x={uc.cx} y={uc.cy + 10} textAnchor="middle"
                    fontSize={11.5} fontFamily="Inter,sans-serif" fontWeight={600}
                    fill={isHov || isSel ? '#fff' : 'var(--texto,#09090b)'}
                    style={{ transition: 'fill .25s' }}>
                    {uc.label[1]}
                  </text>
                </>
              )}
            </g>
          )
        })}

        {/* ── Actor (figura de palo) ── */}
        <g>
          {/* Cabeza */}
          <circle cx={ACT.cx} cy={ACT.cy - 75} r={18}
            fill="var(--surface,#fff)" stroke="var(--acento,#2563eb)" strokeWidth={2} />
          {/* Cuerpo */}
          <line x1={ACT.cx} y1={ACT.cy - 57} x2={ACT.cx} y2={ACT.cy - 20}
            stroke="var(--acento,#2563eb)" strokeWidth={2} />
          {/* Brazos */}
          <line x1={ACT.cx - 20} y1={ACT.cy - 44} x2={ACT.cx + 20} y2={ACT.cy - 44}
            stroke="var(--acento,#2563eb)" strokeWidth={2} />
          {/* Piernas */}
          <line x1={ACT.cx} y1={ACT.cy - 20} x2={ACT.cx - 18} y2={ACT.cy + 8}
            stroke="var(--acento,#2563eb)" strokeWidth={2} />
          <line x1={ACT.cx} y1={ACT.cy - 20} x2={ACT.cx + 18} y2={ACT.cy + 8}
            stroke="var(--acento,#2563eb)" strokeWidth={2} />
          {/* Etiqueta */}
          <text x={ACT.cx} y={ACT.cy + 26} textAnchor="middle"
            fontSize={12} fontWeight={700} fontFamily="Sora,sans-serif"
            fill="var(--acento,#2563eb)">
            Cliente
          </text>
        </g>
      </svg>

      {/* Panel descripción */}
      <div style={{ minHeight: 76, marginTop: '1rem' }}>
        {selCU ? (
          <div style={{
            padding: '1.1rem 1.4rem',
            background: 'var(--acento-bg)', border: '1.5px solid var(--acento)',
            borderRadius: 10, animation: 'fadeIn .2s ease',
            display: 'flex', gap: '1rem', alignItems: 'flex-start',
          }}>
            <span style={{
              flexShrink: 0, width: 12, height: 12, borderRadius: '50%',
              background: selCU.color, display: 'inline-block', marginTop: 4,
            }} />
            <div>
              <strong style={{ color: 'var(--acento)', fontFamily: 'Sora,sans-serif', display:'block', marginBottom:'.3rem' }}>
                {selCU.label.join(' ')}
              </strong>
              <p style={{ color: 'var(--texto-2)', fontSize: '.88rem', lineHeight: 1.7, margin: 0 }}>
                {selCU.desc}
              </p>
            </div>
          </div>
        ) : (
          <p style={{ color: 'var(--texto-3)', fontSize: '.85rem', textAlign: 'center', paddingTop: '.6rem' }}>
            Haz clic en un caso de uso para ver su descripción detallada
          </p>
        )}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// PÁGINA PRINCIPAL
// ─────────────────────────────────────────────
const TABS = [
  { id: 'clases',   label: 'Diagrama de Clases',       sub: 'UML • 4 clases • 3 relaciones' },
  { id: 'casos',    label: 'Diagrama de Casos de Uso', sub: 'UML • 1 actor • 7 casos' },
]

export default function Diagramas() {
  const [tab, setTab] = useState('clases')

  return (
    <div className="pagina">
      {/* Encabezado */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: '.4rem',
          padding: '.3rem .9rem', borderRadius: 30, fontSize: '.8rem', fontWeight: 600,
          background: 'var(--acento-bg)', color: 'var(--acento)',
          border: '1px solid rgba(37,99,235,0.2)', marginBottom: '1rem',
        }}>
          Diagramas UML del Sistema
        </span>
        <h1 style={{ fontSize: '2.4rem', marginBottom: '.6rem' }}>
          Arquitectura de <span style={{ color: 'var(--acento)' }}>LunaTech</span>
        </h1>
        <p style={{ color: 'var(--texto-2)', maxWidth: 520, margin: '0 auto', fontSize: '.95rem', lineHeight: 1.7 }}>
          Representación visual de la estructura del sistema, sus entidades, componentes y los flujos de interacción del usuario.
        </p>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex', gap: '1rem', marginBottom: '2rem',
        padding: '.5rem', background: 'var(--surface-2)', borderRadius: 14,
        border: '1px solid var(--borde)',
      }}>
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              flex: 1, padding: '1rem 1.5rem', borderRadius: 10, border: 'none',
              cursor: 'pointer', textAlign: 'left', transition: 'all .25s',
              background: tab === t.id ? 'var(--surface)' : 'transparent',
              boxShadow: tab === t.id ? 'var(--sombra-sm)' : 'none',
              transform: tab === t.id ? 'translateY(-1px)' : 'none',
            }}
          >
            <div style={{
              fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '.95rem',
              color: tab === t.id ? 'var(--acento)' : 'var(--texto-2)', marginBottom: '.2rem',
            }}>
              {t.label}
            </div>
            <div style={{ fontSize: '.78rem', color: 'var(--texto-3)', fontWeight: 500 }}>
              {t.sub}
            </div>
          </button>
        ))}
      </div>

      {/* Contenido */}
      <div key={tab} style={{ animation: 'fadeIn .3s ease' }}>
        {tab === 'clases' ? <DiagramaClases /> : <DiagramaCasosUso />}
      </div>

      {/* Nota al pie */}
      <div style={{
        marginTop: '3rem', padding: '1.2rem 1.5rem',
        background: 'var(--surface-2)', borderRadius: 12,
        border: '1px solid var(--borde)', display: 'flex', gap: '1rem', alignItems: 'flex-start',
      }}>
        
        <div>
          <strong style={{ display: 'block', fontSize: '.88rem', marginBottom: '.3rem' }}>
            Convenciones UML utilizadas
          </strong>
          <p style={{ color: 'var(--texto-2)', fontSize: '.84rem', lineHeight: 1.7, margin: 0 }}>
            <strong>Diagrama de Clases:</strong> línea discontinua con flecha abierta = dependencia · línea continua con diamante = agregación.<br />
            <strong>Casos de Uso:</strong> línea continua = asociación actor-caso · línea discontinua = relaciones «include» y «extend».
          </p>
        </div>
      </div>
    </div>
  )
}
