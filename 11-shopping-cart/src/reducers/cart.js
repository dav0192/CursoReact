/*
    useReducer: Es un hook que permite manejar estados de manera escalable
    que se basa en que recibe el estado actual y la funcion que tiene que
    hacer, a partir de ambos devuelve un nuevo estado.
*/
// Inicia el estado del reducer
export const cartInitialState = JSON.parse(localStorage.getItem('cart')) || []

export const CART_ACTION_TYPES = {
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    CLEAR_CART: 'CLEAR_CART'
}

// Actualizar localStorage para cart
export const updateLocalStorage = state => {
    window.localStorage.setItem('cart', JSON.stringify(state))
}

// El reducer
export const cartReducer = (state, action) => {
    const { type: actionType, payload: actionPayload } = action
    switch (actionType) {
        case CART_ACTION_TYPES.ADD_TO_CART: {
            const { id } = actionPayload
            // Si el producto ya esta en el carrito
            const productInCartIndex = state.findIndex(item => item.id === id)

            if(productInCartIndex >= 0){
                // StructuredClone: Hace copias profundas de los arrays y los objetos.
                const newState = structuredClone(state)
                newState[productInCartIndex].quantity += 1
                updateLocalStorage(newState)
                return newState
            }

            // Antes de cualquier return actualizar el localStorage
            const newState = [
                ...state,
                {
                    ...actionPayload,
                    quantity: 1
                }
            ]

            updateLocalStorage(newState)

            return newState
        }

        case CART_ACTION_TYPES.REMOVE_FROM_CART: {
            const { id } = actionPayload
            const newState =  state.filter(item => item.id !== id)
            updateLocalStorage(newState)
            return newState
        }

        case CART_ACTION_TYPES.CLEAR_CART: {
            updateLocalStorage(cartInitialState)
            return initialState
        }
    }
    return state
}