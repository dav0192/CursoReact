import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

/*
  El <React.StrictMode></React.StrictMode> es una ayuda que permite ver
  las veces que se ejecutan los componentes de React.
  Al pasar a producción no se ejecuta.
*/

root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);