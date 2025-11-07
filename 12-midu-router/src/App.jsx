// El enrutador
import { Router } from './components/Router.jsx'
import { Route } from './components/Route.jsx'
// Libreria encargada del lazy loading
import { lazy, Suspense } from 'react'
// Páginas a renderizar (Import estático)
// import HomePage from './pages/Home.jsx'
// import AboutPage from './pages/About.jsx'
import Page404 from './pages/404.jsx'
import SearchPage from './pages/Search.jsx'
// Import dinámico
const LazyHomePage = lazy(() => import('./pages/Home.jsx'))
const LazyAboutPage = lazy(() => import('./pages/About.jsx'))

// Rutas Accesibles de la aplicación
const appRoutes = [
  {
    path: '/:lang/about',
    Component: LazyAboutPage
  },
  {
    path: '/search/:query',
    Component: SearchPage
  }
]

export function App () {
  return (
    <main>
        {/*
          Para que se renderizen los componentes con lazy loading es necesario
          que estén encerrados en un elemento Suspense. Suspense es un componente
          de la librería original de react.
        */}
        <Suspense fallback={<div>Cargando...</div>}>
          <Router routes={appRoutes} defaultComponent={Page404}>
            <Route path='/' Component={LazyHomePage}></Route>
            <Route path='/about' Component={LazyAboutPage}></Route>
          </Router>
        </Suspense>
    </main>
  )
}
