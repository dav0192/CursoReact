import { useEffect, useState } from 'react'

// const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'

// Custom Hook
// Para nombrar un custom Hook usar la palabra clave de react use
// Ej: function useCustomHook(){}
// El Custom Hook se convierte en una caja negra
export function useCatImage ({ fact }) {
  const [imageUrl, setImageUrl] = useState()
  // Efecto para recuperar la imagen cada que tenemos una cita nueva
  useEffect(() => {
    if (!fact) return

    const threeFirstWords = fact.split(' ', 3).join(' ')
    // console.log(threeFirstWords)

    fetch(`https://cataas.com/cat/says/${threeFirstWords}?fontSize=50&fontColor=red&json=true`)
      .then(res => res.json())
      .then(response => {
        const { url } = response
        setImageUrl(url)
      })
  }, [fact])

  // TODO: Revisar el funcionamiento
  // Esto debería de funcionar pero solo repite la direccion
  // console.log(`${CAT_PREFIX_IMAGE_URL}${imageUrl}`)

  // Evita devolver estados
  // No se debe de cambiar los estados del Custom Hook desde fuera de este.
  // TODO: Revisar el funcionamineto
  // return { imageUrl: `${CAT_PREFIX_IMAGE_URL}${imageUrl}` }
  // Esto funciona, pero debería ser como esta en el TODO:
  return { imageUrl }
} // { imageUrl: 'https://...' }
