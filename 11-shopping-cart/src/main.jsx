import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.jsx'
import './index.css'
import { FiltersProvider } from './context/filters.jsx'

const root = ReactDOM.createRoot(document.getElementById('app'))

/*
  Filters Provider permite dar contexto a los elementos hijos encerrados
  dentro de las etiquetas. Da acceso a un estado inicial.
*/
root.render(
  <FiltersProvider>
    <App />
  </FiltersProvider>
)
