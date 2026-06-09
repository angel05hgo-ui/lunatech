// Validacion de RUT chileno: formato + digito verificador (modulo 11).

// Limpia el RUT dejando solo numeros y K
export function limpiarRut(rut) {
  return rut.replace(/[^0-9kK]/g, '').toUpperCase()
}

// Formatea el RUT con puntos y guion: 12.345.678-9
export function formatearRut(rut) {
  const limpio = limpiarRut(rut)
  if (limpio.length < 2) return limpio
  const cuerpo = limpio.slice(0, -1)
  const dv = limpio.slice(-1)
  let cuerpoFormateado = ''
  let contador = 0
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    cuerpoFormateado = cuerpo[i] + cuerpoFormateado
    contador++
    if (contador === 3 && i !== 0) {
      cuerpoFormateado = '.' + cuerpoFormateado
      contador = 0
    }
  }
  return `${cuerpoFormateado}-${dv}`
}

// Calcula el digito verificador esperado para un cuerpo numerico
export function calcularDv(cuerpo) {
  let suma = 0
  let multiplo = 2
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i], 10) * multiplo
    multiplo = multiplo === 7 ? 2 : multiplo + 1
  }
  const resto = 11 - (suma % 11)
  if (resto === 11) return '0'
  if (resto === 10) return 'K'
  return String(resto)
}

// Valida el RUT completo. Devuelve true/false.
export function validarRut(rut) {
  const limpio = limpiarRut(rut)
  if (limpio.length < 2) return false
  const cuerpo = limpio.slice(0, -1)
  const dv = limpio.slice(-1)
  if (!/^\d+$/.test(cuerpo)) return false
  return calcularDv(cuerpo) === dv
}
