import { createContext, useState } from "react"

// Pueden exisitir contextos estaticos.
// El contexto es una forma de inyección de dependencias.
// No se limita a crear estados globales.
// Usar para estados con cambios poco frecuentes o pequeños.
// Ej: Que el usuario tenga la sesión iniciada (No siempre se abre/cierra la sesión).

// Esto es un Singleton (Solo se crea una vez)
// 1. Crear el contexto (Este se consume)
export const FiltersContext = createContext()

// 2. Crear el provider (Este provee acceso al contexto)
export function FiltersProvider ({ children }){
    // 3. Definir el estado inicial
    const [filters, setFilters] = useState({
        category: 'all',
        minPrice: 0
    })
    return(
        <FiltersContext.Provider value={{
            filters,
            setFilters
        }}
        >
            { children }
        </FiltersContext.Provider>
    )
}