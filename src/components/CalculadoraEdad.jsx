import { useState } from 'react'
import { calcularEdad } from '../utils/edad.js'

// Calculadora de edad a partir de la fecha de nacimiento.
// Puede usarse de forma autonoma o reportar la edad al padre via onEdadCalculada.
export default function CalculadoraEdad({ valor, onChange, onEdadCalculada }) {
  const [edad, setEdad] = useState(null)
  const [mensaje, setMensaje] = useState('')

  function manejarCalculo(fecha) {
    const resultado = calcularEdad(fecha)
    if (resultado === null) {
      setEdad(null)
      setMensaje('Ingresa una fecha de nacimiento valida.')
      if (onEdadCalculada) onEdadCalculada(null)
    } else {
      setEdad(resultado)
      setMensaje('')
      if (onEdadCalculada) onEdadCalculada(resultado)
    }
  }

  function handleChange(e) {
    const fecha = e.target.value
    if (onChange) onChange(e)
    manejarCalculo(fecha)
  }

  return (
    <div className="calc-edad">
      <label>Fecha de nacimiento *</label>
      <input type="date" value={valor} onChange={handleChange} max={new Date().toISOString().split('T')[0]} />
      {edad !== null && (
        <p className="edad-resultado">Edad calculada: <strong>{edad} años</strong></p>
      )}
      {mensaje && <p className="error-text">{mensaje}</p>}
    </div>
  )
}
