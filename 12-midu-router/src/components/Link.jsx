import { EVENTS } from '../utils/consts.js'

// Creando un nuevo EventListener
export function navigate (href) {
  // 1. Permite cambiar la URL sin recargar la página
  window.history.pushState({}, '', href)
  // 2. Creando un evento personalizado para detectar el cambio de la URL
  const navigationEvent = new Event(EVENTS.PUSHSTATE)
  // 3. Despacha el evento para su funcionamiento
  window.dispatchEvent(navigationEvent)
}

export function Link ({ target, to, ...props }) {
  const handleClick = (event) => {
    console.log('button', event.button)
    // Permite manejar el comportamiento de accesibilidad al dar click a un enlace.
    const isMainEvent = event.button === 0 // Si es el click izquierdo
    const isModifiedEvent = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey
    const isManagableEvent = target === undefined || target === '_self'

    // Comportamiento por defecto
    if (isMainEvent && isManagableEvent && !isModifiedEvent) {
      // Evita que recargue los componentes
      event.preventDefault()
      navigate(to)
    }
  }

  console.log(props.children)

  // a: Anchorage (ancla)
  return <a onClick={handleClick} href={to} target={target} {...props}></a>
}