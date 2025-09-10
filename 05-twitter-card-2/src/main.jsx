import React from 'react';
import ReactDOM from 'react-dom/client';
// Función principal
import { App } from './App.jsx';
// Archivo de estilos principal
import './index.css';

// Creando el arbol de renderizado
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderizando un arbol
root.render(
  <App/>
);
