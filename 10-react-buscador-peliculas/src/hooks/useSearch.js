import { useState, useEffect, useRef } from "react"

/*
  useRef: Es un hook que permite crear referencias mutables que persisten durante
  el ciclo de vida de un componente. Permite guardar un valor que se pueda mutar
  como un id, elemento del DOM o un contador.

  No abusar del uso de referencias.
*/

/*
  FormData permite recuperar un formulario completo sin llenar el programa de getElementBy.
  Gestionando campos No Controlada:

  const handleSubmit = (event) => {
    event.preventDefault()
    const { query } = Object.fromEntries(new window.FormData(event.target))
    console.log({ query })
  }

  Con No Controlado quiere decir no controlado por React y Controlado es controlado por
  React.

  Gestionando campos de manera controlada consume mas recursos de memoria ya que
  Cada que cambia el elemento se vuelve a renderizar.
*/

export function useSearch () {
  const [ search, updateSearch ] = useState('')
  const [error, setError] = useState(null)
  // Flag de apoyo que permite saber si es la primera vez que se renderiza el componente
  // TODO: Revisar despues...
  const isFirstInput = useRef(true)

  // Validar formularios de forma controlada.
  useEffect(() => {
    // Si es la primera vez que se renderiza el componente, no se realiza la busqueda
    // ya que la barra de busqueda esta vacía.
    if(isFirstInput.current){
      isFirstInput.current = search === '' // True
      return
    }

    if (search === "") {
      setError('No se puede buscar una pelicula vacía')
      return
    }

    if (search.match(/^\d+$/)) {
      setError("No se puede buscar una pelicula con un número")
      return
    }

    if (search.length < 3) {
      setError("La búsqueda debe al menos tener 3 caracteres")
      return
    }

    setError(null)
  }, [search])

  return { search, updateSearch, error }
}