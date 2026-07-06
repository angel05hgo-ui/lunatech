// CRUD — LocalStorage con campos sensibles encriptados
import { encriptar, desencriptar } from './crypto.js'

const CLAVE = 'lunatech_solicitudes'
const CAMPOS_SENSIBLES = ['nombre', 'rut', 'email', 'telefono', 'direccion']

function cifrarSolicitud(solicitud) {
  const copia = { ...solicitud }
  CAMPOS_SENSIBLES.forEach((campo) => {
    if (copia[campo] !== undefined) copia[campo] = encriptar(copia[campo])
  })
  return copia
}

function descifrarSolicitud(solicitud) {
  const copia = { ...solicitud }
  CAMPOS_SENSIBLES.forEach((campo) => {
    if (copia[campo] !== undefined) copia[campo] = desencriptar(copia[campo])
  })
  return copia
}

// READ
export function obtenerSolicitudes() {
  try {
    const data = localStorage.getItem(CLAVE)
    if (!data) return []
    return JSON.parse(data).map(descifrarSolicitud)
  } catch {
    return []
  }
}

// READ cifrado
export function obtenerSolicitudesCifradas() {
  try {
    const data = localStorage.getItem(CLAVE)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

function persistir(listaDescifrada) {
  localStorage.setItem(CLAVE, JSON.stringify(listaDescifrada.map(cifrarSolicitud)))
}

// CREATE
export function crearSolicitud(solicitud) {
  const lista = obtenerSolicitudes()
  const nueva = { ...solicitud, id: Date.now(), fechaRegistro: new Date().toLocaleString('es-CL') }
  lista.push(nueva)
  persistir(lista)
  return nueva
}

// UPDATE
export function actualizarSolicitud(id, datos) {
  const lista = obtenerSolicitudes()
  const indice = lista.findIndex((s) => s.id === id)
  if (indice === -1) return null
  lista[indice] = { ...lista[indice], ...datos }
  persistir(lista)
  return lista[indice]
}

// DELETE
export function eliminarSolicitud(id) {
  const lista = obtenerSolicitudes().filter((s) => s.id !== id)
  persistir(lista)
  return lista
}
