// Al consumir directamente de un html, define el script como type="module"
import React from 'https://esm.sh/react@18.2.0';
import ReactDOM from 'https://esm.sh/react-dom@18.2.0/client';

// Se crea el contenedor de los elementos
const appDomElement = document.getElementById("app");

// Se crea el arbol de los elementos
const root = ReactDOM.createRoot(appDomElement);

// Creando elementos
const button1 = React.createElement("button", { "data-id": 123 }, "Botón 1");
const button2 = React.createElement("button", { "data-id": 456 }, "Botón 2");
const button3 = React.createElement("button", { "data-id": 789 }, "Botón 3");

// Agregando elementos a un contenedor
const app = React.createElement(React.Fragment, null, [button1, button2, button3]);

// Se renderizan los elementos (Solo se renderiza un elemento a la vez)
root.render(app);