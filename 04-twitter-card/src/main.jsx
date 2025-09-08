import React from 'react';
import ReactDOM from 'react-dom/client';
// Importando la función principal para renderizar el contenido
import { App } from './App.jsx';
// Importando el archivo de estilos
import './index.css'

// Creando el arbol de renderizado
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderizando el contenido
root.render(
  <App/>
)
