import { useState, useEffect } from 'react'
import { servicios } from '../data/servicios.js'
import { validarRut, formatearRut } from '../utils/rut.js'
import { calcularEdad } from '../utils/edad.js'
import { useMoneda } from '../context/MonedaContext.jsx'
import ServicioCard from './ServicioCard.jsx'

const ESTADO_INICIAL = {
  nombre: '',
  rut: '',
  email: '',
  telefono: '',
  direccion: '',
  fechaNacimiento: '',
  comentario: ''
}

// Formulario de solicitud/cotizacion con validaciones estrictas.
// Si recibe "solicitudEditar", funciona en modo edicion (UPDATE del CRUD).
export default function FormularioSolicitud({ onGuardar, solicitudEditar, onCancelar }) {
  const { formatearPrecio } = useMoneda()
  const [form, setForm] = useState(ESTADO_INICIAL)
  const [serviciosSel, setServiciosSel] = useState([])
  const [errores, setErrores] = useState({})
  const [edad, setEdad] = useState(null)

  // Carga datos cuando se edita una solicitud existente
  useEffect(() => {
    if (solicitudEditar) {
      setForm({
        nombre: solicitudEditar.nombre || '',
        rut: solicitudEditar.rut || '',
        email: solicitudEditar.email || '',
        telefono: solicitudEditar.telefono || '',
        direccion: solicitudEditar.direccion || '',
        fechaNacimiento: solicitudEditar.fechaNacimiento || '',
        comentario: solicitudEditar.comentario || ''
      })
      setServiciosSel(solicitudEditar.servicios || [])
      setEdad(calcularEdad(solicitudEditar.fechaNacimiento))
    }
  }, [solicitudEditar])

  function handleChange(e) {
    const { name, value } = e.target
    let nuevoValor = value
    if (name === 'rut') {
      nuevoValor = formatearRut(value)
    }
    setForm((prev) => ({ ...prev, [name]: nuevoValor }))
    if (name === 'fechaNacimiento') {
      setEdad(calcularEdad(value))
    }
  }

  // Seleccion multiple de servicios (toggle)
  function toggleServicio(id) {
    setServiciosSel((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  // Validaciones estrictas de todos los campos
  function validar() {
    const err = {}

    if (!form.nombre.trim()) {
      err.nombre = 'El nombre es obligatorio.'
    } else if (form.nombre.trim().length < 3) {
      err.nombre = 'El nombre debe tener al menos 3 caracteres.'
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(form.nombre.trim())) {
      err.nombre = 'El nombre solo puede contener letras.'
    }

    if (!form.rut.trim()) {
      err.rut = 'El RUT es obligatorio.'
    } else if (!validarRut(form.rut)) {
      err.rut = 'El RUT es invalido (formato o digito verificador).'
    }

    if (!form.email.trim()) {
      err.email = 'El email es obligatorio.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      err.email = 'Ingresa un email valido.'
    }

    if (!form.telefono.trim()) {
      err.telefono = 'El telefono es obligatorio.'
    } else if (!/^\+?[0-9\s]{8,15}$/.test(form.telefono)) {
      err.telefono = 'Ingresa un telefono valido (8 a 15 digitos).'
    }

    if (!form.direccion.trim()) {
      err.direccion = 'La direccion es obligatoria.'
    }

    if (!form.fechaNacimiento) {
      err.fechaNacimiento = 'La fecha de nacimiento es obligatoria.'
    } else {
      const e = calcularEdad(form.fechaNacimiento)
      if (e === null) err.fechaNacimiento = 'Fecha invalida.'
      else if (e < 18) err.fechaNacimiento = 'Debes ser mayor de 18 años.'
    }

    if (serviciosSel.length === 0) {
      err.servicios = 'Selecciona al menos un servicio.'
    }

    setErrores(err)
    return Object.keys(err).length === 0
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!validar()) return

    const total = serviciosSel.reduce((acc, id) => {
      const serv = servicios.find((s) => s.id === id)
      return acc + (serv ? serv.precioCLP : 0)
    }, 0)

    const datos = {
      ...form,
      edad: calcularEdad(form.fechaNacimiento),
      servicios: serviciosSel,
      totalCLP: total
    }

    onGuardar(datos)

    if (!solicitudEditar) {
      setForm(ESTADO_INICIAL)
      setServiciosSel([])
      setEdad(null)
    }
  }

  // Total dinamico segun moneda activa
  const totalCLP = serviciosSel.reduce((acc, id) => {
    const serv = servicios.find((s) => s.id === id)
    return acc + (serv ? serv.precioCLP : 0)
  }, 0)

  return (
    <form className="formulario card" onSubmit={handleSubmit} noValidate>
      <h2>{solicitudEditar ? 'Editar solicitud' : 'Nueva solicitud de servicio'}</h2>

      <div className="form-grid">
        <div className="campo">
          <label>Nombre completo *</label>
          <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Ej: Juan Perez" />
          {errores.nombre && <span className="error-text">{errores.nombre}</span>}
        </div>

        <div className="campo">
          <label>RUT *</label>
          <input name="rut" value={form.rut} onChange={handleChange} placeholder="12.345.678-9" maxLength={12} />
          {errores.rut && <span className="error-text">{errores.rut}</span>}
        </div>

        <div className="campo">
          <label>Email *</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="correo@ejemplo.cl" />
          {errores.email && <span className="error-text">{errores.email}</span>}
        </div>

        <div className="campo">
          <label>Telefono *</label>
          <input name="telefono" value={form.telefono} onChange={handleChange} placeholder="+56 9 1234 5678" />
          {errores.telefono && <span className="error-text">{errores.telefono}</span>}
        </div>

        <div className="campo">
          <label>Direccion *</label>
          <input name="direccion" value={form.direccion} onChange={handleChange} placeholder="Calle, numero, comuna" />
          {errores.direccion && <span className="error-text">{errores.direccion}</span>}
        </div>

        <div className="campo">
          <label>Fecha de nacimiento *</label>
          <input
            name="fechaNacimiento"
            type="date"
            value={form.fechaNacimiento}
            onChange={handleChange}
            max={new Date().toISOString().split('T')[0]}
          />
          {edad !== null && edad >= 0 && (
            <span className="edad-hint">Edad: <strong>{edad} años</strong></span>
          )}
          {errores.fechaNacimiento && <span className="error-text">{errores.fechaNacimiento}</span>}
        </div>
      </div>

      <div className="campo">
        <label>Comentario (opcional)</label>
        <textarea name="comentario" value={form.comentario} onChange={handleChange} rows={3} placeholder="Describe el problema o detalle adicional..." />
      </div>

      <h3 className="subtitulo">Selecciona los servicios *</h3>
      {errores.servicios && <span className="error-text">{errores.servicios}</span>}
      <div className="servicios-mini-grid">
        {servicios.map((s) => (
          <ServicioCard
            key={s.id}
            servicio={s}
            seleccionable
            seleccionado={serviciosSel.includes(s.id)}
            onToggle={toggleServicio}
          />
        ))}
      </div>

      <div className="total-box">
        <span>Total estimado:</span>
        <strong>{formatearPrecio(totalCLP)}</strong>
      </div>

      <div className="form-acciones">
        <button type="submit" className="btn btn-primario">
          {solicitudEditar ? 'Actualizar solicitud' : 'Registrar solicitud'}
        </button>
        {solicitudEditar && (
          <button type="button" className="btn btn-secundario" onClick={onCancelar}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}
