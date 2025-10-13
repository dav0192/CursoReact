import { Filters } from './Filters.jsx'

// Recibimos el useState de App (setFilters)
// App->[Header]->Filters
// Enviamos los datos al componente hijo filters.
export function Header () {
    return (
        <header>
            <h1>React Shop 🛒</h1>
            <Filters />
        </header>
    )
}