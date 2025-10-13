import { Products } from './components/Products'
import { Header } from './components/Header'
import { products as initialProducts } from './mocks/products.json'
import { Footer } from './components/Footer.jsx'
import { IS_DEVELOPMENT } from './config.js'
import { useFilters } from './hooks/useFilters.js'
import { Cart } from './components/Cart.jsx'
import { CartProvider } from './context/cart.jsx'

export function App({ }) {
    const { filterProducts } = useFilters()
    const filteredProducts = filterProducts(initialProducts)

    /*
        Es necesario hacer un taladreo de atributos, ya que filters necesita acceder a
        los valores de filters, pero es un componente hijo del componente header.
        Para ello enviaremos el estado de setFilters al header.
        [App]->Header->Filters

        Para evitar el uso de prop drilling es posible usar useContext para crear
        un contexto global entre componentes
    */
    return (
        <CartProvider>
            <Header/>
            <Cart></Cart>
            <Products products={filteredProducts}></Products>
            { IS_DEVELOPMENT && <Footer /> }
        </CartProvider>
    )
}
