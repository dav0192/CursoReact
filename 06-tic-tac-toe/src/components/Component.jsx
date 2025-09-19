import { useState, useEffect } from 'react';

// Código de Ejemplo
const Component = () => {
    const [value, setValue] = useState(false);
    useEffect(() = {
        // Como minimo el código se ejecuta una vez
        console.log("Código a ejecutar");
    }, listOfDependencies);
}