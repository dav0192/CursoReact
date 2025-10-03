// Este Hook se encarga del fetching de datos
import { useState, useRef, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies.js'

/*
  Evita el uso de variables globales, ya que estas se pueden llegar a enviar a otros
  componentes. Para ello mejor usa useRef.
*/

export function useMovies ({ search, sort }) {
  // Permite realizar la llamada a la API y almacenar los datos en movies
  const [movies, setMovies] = useState([])
  // Permite agregar una animación de cargando que se muestra antes de recibir
  // Respuesta de la API
  const [loading, setLoading] = useState(false)
  // Permite mostrar algun error de conexión durante el fetching de datos.
  const [error, setError] = useState(null)
  // Permite recordar la busqueda anterior y si la información de busqueda es
  // la misma que la anterior no se realiza la busqueda.
  const previousSearch = useRef(search)

  /*
    useMemo:
    Permite memorizar un valor para no volver a calcularlo dependiendo de una lista de
    dependencias.

    useCallback:
    Hace lo mismo que useMemo pero solo para funciones.
  */

  const getMovies = useCallback(async ({ search }) => {
    if (search === previousSearch.current) return

    try {
      setLoading(true)
      setError(null)
      previousSearch.current = search
      const newMovies = await searchMovies({ search })
      setMovies(newMovies)
    } catch (e) {
      setError(e.message)
    }finally {
      // Esto se ejecuta siempre
      setLoading(false)
    }
  }, [])

  // const getSortedMovies = () => {
  //   console.log('getSortedMovies')
  //   const sortedMovies = sort
  //     ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
  //     : movies

  //   return sortedMovies
  // }

  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
  }, [sort, movies])

  return { movies: sortedMovies, getMovies, loading }
}
