import { useState, useEffect } from 'react'
import './App.css'

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
// const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firstWord}?fontSize=50&fontColor=red&json=true`

export function App () {
  const [fact, setFact] = useState('lorem ipsum cat fact whatever')
  const [imageUrl, setImageUrl] = useState()

  // Aprender fetch, es posible que no permitan usar React Query, SWR, Axios o Apollo.
  // El fetching de datos debe ir dentro de un useEffect y no en el cuerpo de la función
  // Ya que cargaría los datos varias veces consumiendo demasiada memoria.
  // Nunca olvides el Array de dependencias (Es lo primero).
  // Las dependencias a agregar son unicamente aquellas que pueden llegar a cambiar.
  // Para ejecutar el useEffect cada vez que se renderiza el componente: useEffect(() => {})
  // Para ejecutar el useEffect solo la primera vez: useEffect(() => {}, [])
  // Para ejecutar el useEffect cada vez que se renderize el componente y
  // cada que cambie una dependencia: useEffect(() =>{}, [dependencia])
  // No usar StackOverflow en entrevistas.
  // En los estados es importante siempre tener lo minimo necesario.
  // Los efectos deben tener solo una responsabilidad.
  // Efecto para recuperar la cita al renderizar la página.
  useEffect(() => {
    if (!fact) return
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      // TODO: Handle error if !res.ok (Pendiente)
      .then(res => res.json())
      .then(data => {
        const { fact } = data
        setFact(fact)
      })
  }, [])

  // Efecto para recuperar la imagen cada que tenemos una cita nueva
  useEffect(() => {
    const threeFirstWords = fact.split(' ', 3).join(' ')
    console.log(threeFirstWords)
    fetch(`https://cataas.com/cat/says/${threeFirstWords}?fontSize=50&fontColor=red&json=true`)
      .then(res => res.json())
      .then(response => {
        const { url } = response
        setImageUrl(url)
      })
  }, [fact])

  return (
    <main>
      <h1>App de gatitos</h1>
      <section>
        {fact && <p>{fact}</p>} {/* Renderizado Condicional */}
        {imageUrl && <img src={imageUrl} alt={`Image extracted using the first three words for ${fact}`} />}
      </section>
    </main>
  )
}
