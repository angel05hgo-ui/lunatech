// Algoritmo para calcular la edad de una persona a partir de su fecha de nacimiento.
// Recibe un string de fecha (formato YYYY-MM-DD del input date) y devuelve la edad en anios.
export function calcularEdad(fechaNacimiento) {
  if (!fechaNacimiento) return null

  const hoy = new Date()
  const nacimiento = new Date(fechaNacimiento)

  if (isNaN(nacimiento.getTime())) return null
  if (nacimiento > hoy) return null

  let edad = hoy.getFullYear() - nacimiento.getFullYear()
  const mes = hoy.getMonth() - nacimiento.getMonth()

  // Si aun no cumple anios este anio, se resta 1
  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--
  }

  return edad
}
