import { NavLink, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

function LogoIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="16" cy="16" r="15" fill="var(--acento)" opacity="0.12" />
      <path d="M20 8a9 9 0 1 0 0 16 7 7 0 1 1 0-16z" fill="var(--acento)" />
      <circle cx="22" cy="11" r="2" fill="var(--acento)" opacity="0.5" />
    </svg>
  )
}

export default function Navbar() {
  const [abierto, setAbierto] = useState(false)
  const [oscuro, setOscuro] = useState(() => {
    const guardado = localStorage.getItem('tema')
    return guardado ? guardado === 'dark' : true
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', oscuro ? 'dark' : 'light')
    localStorage.setItem('tema', oscuro ? 'dark' : 'light')
  }, [oscuro])

  const cerrar = () => setAbierto(false)

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="logo" onClick={cerrar}>
          <LogoIcon />
          <span className="logo-text">Luna<strong>Tech</strong></span>
        </Link>

        <button
          className="navbar-toggle"
          onClick={() => setAbierto(v => !v)}
          aria-label="Abrir menu"
        >
          {abierto ? '✕' : '☰'}
        </button>

        <nav className={`nav-links ${abierto ? 'open' : ''}`}>
          <NavLink to="/" onClick={cerrar} end>Inicio</NavLink>
          <NavLink to="/servicios" onClick={cerrar}>Servicios</NavLink>
          <NavLink to="/cotizar" onClick={cerrar}>Cotizar</NavLink>
          <NavLink to="/solicitudes" onClick={cerrar}>Solicitudes</NavLink>
          <NavLink to="/diagramas" onClick={cerrar}>Diagramas</NavLink>
          <NavLink to="/manual" onClick={cerrar}>Manual</NavLink>
          <NavLink to="/terminos" onClick={cerrar}>Terminos</NavLink>

          <button className="btn-tema" onClick={() => setOscuro(v => !v)} aria-label="Cambiar tema">
            <span className="btn-tema-icon">{oscuro ? '☀' : '◑'}</span>
            <span>{oscuro ? 'Claro' : 'Oscuro'}</span>
          </button>
        </nav>
      </div>
    </header>
  )
}
