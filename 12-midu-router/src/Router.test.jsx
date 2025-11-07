import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
// Es necesario importar el componente que se quiere someter a pruebas.
import { Router } from './components/Router.jsx'
import { Route } from './components/Route.jsx'
import { Link } from './components/Link.jsx'
import { getCurrentPath } from './utils/getCurrentPath.js'

/*
  1. Para las pruebas es necesario instalar las siguientes dependencias:
  - npm install vitest -D
  - npm install happy-dom @testing-library/react -D
  2. En vite.config.js agregar:
  test: {
    environment: 'happy-dom'
  }
*/

// La ruta del mock debe ser igual a la del getCurrentPath
vi.mock('./utils/getCurrentPath.js', () => ({
  getCurrentPath: vi.fn()
}))

// Detecta si el componente no renderiza.
describe('Router', () => {
  // Se ejecuta antes de cada test
  beforeEach(() => {
    // Limpia la pantalla
    cleanup()
    vi.clearAllMocks()
  })

  // Comprueba si se renderiza el componente Router.
  it('Should render without problems', () => {
    render(<Router routes={[]} />)
    expect(true).toBeTruthy()
  })

  // Comprueba si se renderiza la ruta del código de error 404.
  it('Should render 404 if no routes match', () => {
    render(<Router routes={[]} defaultComponent={() => <h1>404</h1>}/>)
    expect(screen.getByText('404')).toBeTruthy()
  })

  // Comprueba que se renderize el primer componente que concuerde.
  it('Should render the component of the first route that matches', () => {
    getCurrentPath.mockReturnValue('/about')
    const routes = [
      {
        path: '/',
        Component: () => <h1>Home</h1>
      },
      {
        path: '/about',
        Component: () => <h1>About</h1>
      }
    ]

    render(<Router routes={routes} />)
    expect(screen.getByText('About')).toBeTruthy()
  })

  // Comprueba el funcionamiento de la navegación usando los links
  it('Should navigate using the links', async () => {
    getCurrentPath.mockReturnValueOnce('/')

    render(
      <Router>
        <Route path='/' Component={() => {
          return (
              <>
                <h1>Home</h1>
                <Link to='/about'>About</Link>
              </>
            )
          }}
        />
        <Route path='/about' Component={() => <h1>About</h1>} />
      </Router>
    )

    // Activar el click en el link
    const anchor = screen.getByText(/About/)
    fireEvent.click(anchor)

    const aboutTitle = await screen.findByText('About')

    // Comprueba que la nueva ruta se renderize
    expect(aboutTitle).toBeTruthy()
  })
})
