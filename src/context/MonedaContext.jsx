// Contexto global de moneda: consume la API de mindicador.cl y expone
// las tasas de UTM, UF, Euro y Dolar para convertir precios desde CLP.
import { createContext, useContext, useState, useEffect } from 'react'

const MonedaContext = createContext(null)

// Monedas soportadas. 'CLP' es el valor por defecto (tasa 1).
export const MONEDAS = {
  CLP: { codigo: 'CLP',   etiqueta: 'CLP — $',   simbolo: 'CLP $'  },
  UTM: { codigo: 'utm',   etiqueta: 'UTM',        simbolo: 'UTM'    },
  UF:  { codigo: 'uf',    etiqueta: 'UF',         simbolo: 'UF'     },
  EUR: { codigo: 'euro',  etiqueta: 'EUR — €',    simbolo: 'EUR €'  },
  USD: { codigo: 'dolar', etiqueta: 'USD — US$',  simbolo: 'USD $'  },
}

export function MonedaProvider({ children }) {
  const [indicadores, setIndicadores] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [monedaActiva, setMonedaActiva] = useState('CLP')

  useEffect(() => {
    async function cargarIndicadores() {
      try {
        setCargando(true)
        const resp = await fetch('https://mindicador.cl/api')
        if (!resp.ok) throw new Error('No se pudo conectar con la API')
        const data = await resp.json()
        setIndicadores(data)
        setError(null)
      } catch (e) {
        setError('No se pudieron cargar los indicadores. Revisa tu conexion.')
      } finally {
        setCargando(false)
      }
    }
    cargarIndicadores()
  }, [])

  // Devuelve el valor en CLP de 1 unidad de la moneda dada
  function valorUnidadCLP(codigoMoneda) {
    if (codigoMoneda === 'CLP') return 1
    const mapa = MONEDAS[codigoMoneda]
    if (!mapa || !indicadores) return 1
    const indicador = indicadores[mapa.codigo]
    return indicador ? indicador.valor : 1
  }

  // Convierte un monto en CLP a la moneda activa
  function convertirDesdeCLP(montoCLP, codigoMoneda = monedaActiva) {
    const unidad = valorUnidadCLP(codigoMoneda)
    return montoCLP / unidad
  }

  // Formatea un monto en CLP segun la moneda activa
  function formatearPrecio(montoCLP, codigoMoneda = monedaActiva) {
    const convertido = convertirDesdeCLP(montoCLP, codigoMoneda)
    const meta = MONEDAS[codigoMoneda]
    if (codigoMoneda === 'CLP') {
      return 'CLP $' + Math.round(convertido).toLocaleString('es-CL')
    }
    return meta.simbolo + ' ' + convertido.toLocaleString('es-CL', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4
    })
  }

  const value = {
    indicadores,
    cargando,
    error,
    monedaActiva,
    setMonedaActiva,
    valorUnidadCLP,
    convertirDesdeCLP,
    formatearPrecio
  }

  return <MonedaContext.Provider value={value}>{children}</MonedaContext.Provider>
}

export function useMoneda() {
  const ctx = useContext(MonedaContext)
  if (!ctx) throw new Error('useMoneda debe usarse dentro de MonedaProvider')
  return ctx
}
