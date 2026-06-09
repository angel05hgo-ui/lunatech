// Metodo de encriptacion simple para datos sensibles antes de guardar en LocalStorage.
// Combina un cifrado Cesar (desplazamiento) con codificacion Base64.
// NOTA: Es un cifrado academico/demostrativo, no apto para produccion real.

const DESPLAZAMIENTO = 5

// Cifra texto desplazando el codigo de cada caracter y luego aplicando Base64
export function encriptar(texto) {
  if (texto === null || texto === undefined) return ''
  const str = String(texto)
  let desplazado = ''
  for (let i = 0; i < str.length; i++) {
    desplazado += String.fromCharCode(str.charCodeAt(i) + DESPLAZAMIENTO)
  }
  // btoa con soporte para caracteres UTF-8
  return btoa(unescape(encodeURIComponent(desplazado)))
}

// Descifra el proceso inverso: Base64 -> desplazamiento inverso
export function desencriptar(textoCifrado) {
  if (!textoCifrado) return ''
  try {
    const desplazado = decodeURIComponent(escape(atob(textoCifrado)))
    let original = ''
    for (let i = 0; i < desplazado.length; i++) {
      original += String.fromCharCode(desplazado.charCodeAt(i) - DESPLAZAMIENTO)
    }
    return original
  } catch (e) {
    return '(dato ilegible)'
  }
}
