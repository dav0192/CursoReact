/*
  La función .map() modifica el contenido de un array y puede asignarse a un nuevo arreglo.
  const numeros = [1, 2, 3, 4, 5]
  let dobles = numeros.map(n => n * 2)
  console.log(numeros) // [1, 2, 3]
  console.log(dobles) // [2, 4, 6]
*/

// Recibe el arreglo de movies y en vez de asignarlo a una variable lo renderiza como un
// nuevo componente para cada elemento del arreglo.
export function ListOfMovies({ movies }) {
  return (
    <ul className="movies">
      {movies.map((movie) => (
        <li className="movie" key={movie.id}>
          <h3>{movie.title}</h3>
          <p>{movie.year}</p>
          <img src={movie.poster} alt={movie.title} />
        </li>
      ))}
    </ul>
  );
}

// Si no hay peliculas que coincidan con el nombre devuelve el mensaje
export function NoMoviesResults({}) {
  return <p>No se encontraron peliculas para esta búsqueda</p>;
}

// Implementa la logica de los dos componentes anteriores para crear un solo componente.
export function Movies({ movies }) {
  const hasMovies = movies?.length > 0

  // Si hay al menos una pelicula la muestra, pero si no hay ninguna muestra el mensaje
  // No se encontraron peliculas para esta búsqueda.
  return (
    hasMovies
    ? <ListOfMovies movies={movies} />
    : <NoMoviesResults />
  )
}
