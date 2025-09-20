import { useEffect, useState } from 'react';

const FollowMouse = () => {
    const [ enabled, setEnabled ] = useState(false);
    // Es importante que se inicialicen los parametros de nuestro cursor.
    const [ position, setPosition ] = useState({ X: 0, Y: 0 });
    /*
        Estructura del useEffect:
        useEffect(() => { // Función a ejecutar
            console.log("Efecto", { enabled }); // Instrucciones ejecutadas
        },[enabled]); // Variables que al modificar su estado provocan que se active el useEffect
    */

    // Nunca debes meter un hook (estado) dentro de un if, para ello usa un useEffect
    // el useEffect debe estar en el cuerpo del componente.
    /*
        Al activar un useEffect es importante crearlo, asi como cuando al desactivarlo
        es importante limpiarlo.
    */
    useEffect(() => {
        console.log('Effect', { enabled });

        const handleMove = (event) => {
            const { clientX, clientY } = event;
            console.log("handleMove", { clientX, clientY });
            setPosition({ X: clientX, Y: clientY });
        };

        if(enabled){
            window.addEventListener("pointermove", handleMove);
        }

        // Limpiando el evento, se ejecuta cuando se desmonta el componente.
        // Se ejecuta cuando cambian las dependencias del componente.
        // El efecto de nuevo
        return () => {
            console.log("cleanup");
            window.removeEventListener("pointermove", handleMove);
        };
    }, [enabled]);

    return (
        <>
            <div style={{
                position: 'absolute',
                backgroundColor: '#09f',
                borderRadius: '50%',
                opacity: 0.8,
                pointerEvents: 'none',
                left: -20,
                top: -20,
                width: 40,
                height: 40,
                transform: `translate(${position.X}px, ${position.Y}px)`
            }}></div>
            <button onClick={() => setEnabled(!enabled)}>
                {enabled ? 'Desactivar': 'Activar'} seguir puntero
            </button>
        </>
    );
};

function App(){
    // Permite montar y desmontar los componentes
    // const [mounted, setMounted] = useState(true);
    return (
        <main>
            {/* Permite montar y desmontar los componentes */}
            {/* { mounted && <FollowMouse></FollowMouse> }
            <button onClick={() => { setMounted(!mounted) }}>Toggle Mounted FollowMouse component</button>*/}
            <FollowMouse/>
        </main>
    );
}

export default App;