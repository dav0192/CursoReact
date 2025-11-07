import { useState, useEffect, Children } from 'react'
import { EVENTS } from '../utils/consts.js'
import { match } from 'path-to-regexp'
import { getCurrentPath } from '../utils/getCurrentPath.js'

export function Router ({ children, routes = [], defaultComponent: DefaultComponent = () => <h1>Error 404</h1>}) {
  const [currentPath, setCurrentPath] = useState(getCurrentPath())

  console.log(children)

  useEffect(() => {
    // 1. Callback para detectar el cambio de dirección.
    const onLocationChange = () => {
        setCurrentPath(getCurrentPath())
    }

    // 2. Se agrega el eventListener asignando el callback anterior.
    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)
    // El popstate se encarga de escuchar los controles de la web de adelante y atrás
    window.addEventListener(EVENTS.POPSTATE, onLocationChange)

    // 3. Se finaliza eliminando el eventListener
    return () => {
        window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
        window.removeEventListener(EVENTS.POPSTATE, onLocationChange)
    }
  }, [])

  let routeParams = {}

  // Agregar rutas del componente children
  const routesFromChildren = Children.map(children, ({ props, type }) => {
    const { name } = type
    const isRoute = name === 'Route'

    return isRoute ? props : null
  })

  const routesToUse = routes.concat(routesFromChildren).filter(Boolean)

  // Buscar la ruta dentro de la constante rutas
  const Page = routesToUse.find(({ path }) => {
    if (path === currentPath) return true

    // Se usa path-to-regexp
    // Para detectar rutas dinámicas como por ejemplo
    // /search/:query <-- query es una ruta dinámica.
    // Si se ha encontrado la URL
    const matcherUrl = match(path, { decode: decodeURIComponent })
    // Compara el currentPath
    const matched = matcherUrl(currentPath)

    // Si no devuelve false
    if (!matched) return false

    // Guardar los parametros de la url que erán dinámicos
    // y que se han extraído con path-to-regexp
    // por ejemplo, si la ruta es /search/:query
    // y la URL es /search/javascript
    // matched.params.query === 'javascript'
    routeParams = matched.params // { query: 'JavaScript'} /search/JavaScript

    return true
  })?.Component // Encadenado opcional

  return Page
    ? <Page routeParams={routeParams} />
    : <DefaultComponent routeParams={routeParams}/>
}
