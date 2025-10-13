import { useContext } from 'react'
import { CartContext } from '../context/cart.jsx'

// Es recomendable no usar un contexto amplio entre componentes.
export const useCart = () => {
    // Consumiendo el Contexto
    const context = useContext(CartContext)

    if(context === undefined) {
        throw new Error('useCart must be used within a CartProvider')
    }

    return context
}
