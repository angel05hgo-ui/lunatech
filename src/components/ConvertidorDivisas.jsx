import { useState } from 'react'
import { useMoneda, MONEDAS } from '../context/MonedaContext.jsx'

// Convertidor de divisas: calcula UTM, UF, Euro y Dolar en pesos chilenos.
export default function ConvertidorDivisas() {
  const { indicadores, cargando, error, valorUnidadCLP } = useMoneda()
  const [monto, setMonto] = useState('1')
  const [moneda, setMoneda] = useState('UF')

  // Calculo: monto * valor de la unidad en CLP
  const cantidad = parseFloat(monto) || 0
  const valorUnidad = valorUnidadCLP(moneda)
  const resultadoCLP = cantidad * valorUnidad

  if (cargando) {
    return <div className="card conversor"><p>Cargando indicadores economicos...</p></div>
  }

  if (error) {
    return <div className="card conversor"><p className="error-text">{error}</p></div>
  }

  return (
    <div className="card conversor">
      <h3>💱 Convertidor de Divisas</h3>
      <p className="conversor-sub">Valores actualizados desde mindicador.cl</p>

      <div className="conversor-grid">
        <div className="campo">
          <label>Cantidad</label>
          <input
            type="number"
            min="0"
            step="any"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
          />
        </div>

        <div className="campo">
          <label>Moneda / Indicador</label>
          <select value={moneda} onChange={(e) => setMoneda(e.target.value)}>
            <option value="UTM">UTM</option>
            <option value="UF">UF</option>
            <option value="EUR">Euro</option>
            <option value="USD">Dolar</option>
          </select>
        </div>
      </div>

      <div className="conversor-resultado">
        <span>{cantidad} {MONEDAS[moneda].simbolo} =</span>
        <strong>${Math.round(resultadoCLP).toLocaleString('es-CL')} CLP</strong>
      </div>

      <div className="indicadores-mini">
        {indicadores && (
          <>
            <span>UTM: ${indicadores.utm?.valor.toLocaleString('es-CL')}</span>
            <span>UF: ${indicadores.uf?.valor.toLocaleString('es-CL')}</span>
            <span>Euro: ${indicadores.euro?.valor.toLocaleString('es-CL')}</span>
            <span>Dolar: ${indicadores.dolar?.valor.toLocaleString('es-CL')}</span>
          </>
        )}
      </div>
    </div>
  )
}
