// Clases básicas para el funcionamiento del programa
import { useState, useCallback } from 'react'
// Clase encargada del fetching de datos
import { useMovies } from './hooks/useMovies.js'
// Clase encargada del manejo del formulario
import { useSearch } from './hooks/useSearch.js'
// Componente que renderiza la lista de peliculas
import { Movies } from './components/Movies.jsx'
// Libreria con la que nos apoyamos a realizar el debouncing
import debounce from 'just-debounce-it'
// Hoja de estilos generica
import './water.css'

export function App() {
  // Comprueba si es necesario ordenar las peliculas por titulo
  const [sort, setSort] = useState(false)

  // Custom Hook que permite detectar los cambios en el cuadro de busqueda
  const { search, updateSearch, error } = useSearch()
  // Custom Hook que permite realizar la petición a la API
  const { movies, loading, getMovies } = useMovies({ search, sort })

  // Crea el debounce, permite esperar a que el usuario termine de escribir
  // en la barra de busqueda y evitar que se haga un llamado constante a la
  // API.
  const debouncedGetMovies = useCallback(
    debounce(search => {
    console.log('search', search)
    getMovies({ search })
  }, 300)
  , [getMovies])

  // Desencadena la función principal de la prueba, realiza la busqueda.
  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }

  // Cambia el estado del checkbox para ordenar los datos.
  const handleSort = () => {
    setSort(!sort)
  }

  /*
    Debounce:
    Mientras el usuario escribe en la barra no hacer nada y esperar a que deje de escribir
    un tiempo para que sea la última llamada la que se ejecute.
  */
  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de peliculas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input onChange={handleChange} value={search} name='query' type="text" placeholder="Avengers, Star Wars, The Matrix" />
          <input type="checkbox" onChange={handleSort} checked={sort}/>
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
        {
          /* Aqui irán los resultados */
          loading ? <p>Cargando...</p> : <Movies movies={movies} />
        }
      </main>
    </div>
  )
}
