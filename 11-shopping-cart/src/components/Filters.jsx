import { useId } from 'react'
import { useFilters } from '../hooks/useFilters.js'
import './Filters.css'

// Recibimos el useState de setFilters desde App y Header
// App->Header->[Filters]
/*
    Para prevenir el problema de dos fuentes de la verdad es necesario depender
    de los estados globales de la interfaz.
*/
export function Filters () {
    // Usando el contexto de useFilters
    const { filters, setFilters } = useFilters()
    // const [minPrice, setMinPrice] = useState(0) // Estado local
    // Crea un ID único para cada elemento (útil para elementos que se iteran constantemente).
    const minPriceFilterId = useId()
    const categoryFilterId = useId()

    const handleChangeMinPrice = (event) => {
        // Algo anda mal, hay dos fuentes
        // setMinPrice(event.target.value) esta era local, por lo cual debe eliminarse
        // Aquí se esta usando el estado global
        setFilters(prevState => ({
            ...prevState,
            minPrice: event.target.value
        }))
    }

    const handleChangeCategory = (event) => {
        // Esto tambien esta mal
        // estamos pasando la funcion de actualizar estado nativa de react
        // a un componente hijo
        setFilters(prevState => ({
            ...prevState,
            category: event.target.value
        }))
    }

    return (
        <section className="filters">
            <div>
                <label htmlFor={minPriceFilterId}>Precio Mínimo</label>
                <input
                    type="range"
                    id={minPriceFilterId}
                    min='0'
                    max='1000'
                    onChange={handleChangeMinPrice}
                    value={filters.minPrice}
                />
                <span>${filters.minPrice}</span><small></small>
            </div>
            <div>
                <label htmlFor={categoryFilterId}> Categoría</label>
                <select name="" id={categoryFilterId} onChange={handleChangeCategory}>
                    <option value="all">Todas</option>
                    <option value="laptops">Portátiles</option>
                    <option value="smartphones">Celulares</option>
                </select>
            </div>
        </section>
    )
}