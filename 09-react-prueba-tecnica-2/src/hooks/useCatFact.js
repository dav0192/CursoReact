import { useState, useEffect } from 'react'
import { getRandomFact } from '../services/facts.js'

/*
  No usar useCatFetch. Los Custom Hooks no deben ir atados a la implementación.
  La implementación es el funcionamiento interno del Custom Hook. Un custom hook
  debe ser una caja negra.
*/
export function useCatFact () {
  const [fact, setFact] = useState('lorem ipsum cat fact whatever')

  const refreshFact = () => {
    getRandomFact().then(newFact => setFact(newFact))
  }

  // Para recuperar la cita al cargar la página
  useEffect(refreshFact, [])

  // Evita devolver el cambio de estados
  return { fact, refreshFact }
}
