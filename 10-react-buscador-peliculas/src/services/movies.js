// API_KEY Generada desde www.omdbapi.com
const API_KEY = '610f2821'

export const searchMovies = async ({ search }) => {
  if(search === "") return null

  try{
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
    const json = await response.json()

    const movies = json.Search

    // No usar directamente la respuesta que se recibe de la API, ya que esta puede cambiar con
    // El tiempo.
    return movies?.map(movie =>({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster
    }))
  } catch (e) {
    throw new Error('Error searching movies')
  }
}