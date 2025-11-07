import { useState, useEffect } from 'react'
import { Link } from '../components/Link.jsx'

export default function SearchPage ({ routeParams }) {
  useEffect(() => {
    document.title = `Has buscado: ${routeParams.query}`
  }, [])
  return (
    <>
      <h1>Has buscado: {routeParams.query}</h1>
      <Link to='/'> Volver al Inicio</Link>
    </>
  )
}