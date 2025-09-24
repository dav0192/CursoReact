import { useCatImage } from './hooks/useCatImage.js'
import { useCatFact } from './hooks/useCatFact.js'
import { Otro } from './components/Otro.jsx'
import './App.css'

/*
  Importante no pasar los setState fuera del componente.

  Un custom Hook es reutilizar la logica de distintos componentes en otros
  componentes.

  Para crear un Custom Hook es necesario preguntarse si un useEffect podría
  reutilizarse.
*/

export function App () {
  const { fact, refreshFact } = useCatFact()
  const { imageUrl } = useCatImage({ fact })

  const handleClick = async () => {
    refreshFact()
  }

  return (
    <main>
      <h1>App de gatitos</h1>
      <button onClick={handleClick}>Get New Fact</button>
      <section>
        {fact && <p>{fact}</p>} {/* Renderizado Condicional */}
        {imageUrl && <img src={imageUrl} alt={`Image extracted using the first three words for ${fact}`} />}
      </section>
      <Otro />
    </main>
  )
}
