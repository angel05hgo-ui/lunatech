// Capa CRUD sobre LocalStorage para las solicitudes de clientes.
// Los datos sensibles (nombre, rut, email, telefono) se guardan ENCRIPTADOS.
import { encriptar, desencriptar } from './crypto.js'

const CLAVE = 'lunatech_solicitudes'

// Campos sensibles que se cifran antes de almacenar
const CAMPOS_SENSIBLES = ['nombre', 'rut', 'email', 'telefono', 'direccion']

function cifrarSolicitud(solicitud) {
  const copia = { ...solicitud }
  CAMPOS_SENSIBLES.forEach((campo) => {
    if (copia[campo] !== undefined) {
      copia[campo] = encriptar(copia[campo])
    }
  })
  return copia
}

function descifrarSolicitud(solicitud) {
  const copia = { ...solicitud }
  CAMPOS_SENSIBLES.forEach((campo) => {
    if (copia[campo] !== undefined) {
      copia[campo] = desencriptar(copia[campo])
    }
  })
  return copia
}

// READ: obtiene todas las solicitudes (descifradas para mostrar)
export function obtenerSolicitudes() {
  try {
    const data = localStorage.getItem(CLAVE)
    if (!data) return []
    const lista = JSON.parse(data)
    return lista.map(descifrarSolicitud)
  } catch (e) {
    return []
  }
}

// READ crudo: devuelve las solicitudes tal como estan en storage (cifradas)
export function obtenerSolicitudesCifradas() {
  try {
    const data = localStorage.getItem(CLAVE)
    return data ? JSON.parse(data) : []
  } catch (e) {
    return []
  }
}

function persistir(listaDescifrada) {
  const cifrada = listaDescifrada.map(cifrarSolicitud)
  localStorage.setItem(CLAVE, JSON.stringify(cifrada))
}

// CREATE: agrega una nueva solicitud
export function crearSolicitud(solicitud) {
  const lista = obtenerSolicitudes()
  const nueva = {
    ...solicitud,
    id: Date.now(),
    fechaRegistro: new Date().toLocaleString('es-CL')
  }
  lista.push(nueva)
  persistir(lista)
  return nueva
}

// UPDATE: actualiza una solicitud por id
export function actualizarSolicitud(id, datos) {
  const lista = obtenerSolicitudes()
  const indice = lista.findIndex((s) => s.id === id)
  if (indice === -1) return null
  lista[indice] = { ...lista[indice], ...datos }
  persistir(lista)
  return lista[indice]
}

// DELETE: elimina una solicitud por id
export function eliminarSolicitud(id) {
  const lista = obtenerSolicitudes().filter((s) => s.id !== id)
  persistir(lista)
  return lista
}
