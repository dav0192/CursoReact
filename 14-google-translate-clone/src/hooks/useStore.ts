import { AUTO_LANGUAGE } from '../constants'
import { type Action, type FromLanguage, type State, type Language } from '../types'
import { useReducer } from 'react'

// 1. Crear el estado inicial
export const initialState: State = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false
}


// 2. Crear el reducer
// Un reducer recibe el estado inicial y el reducer, el reducer cada que se
// llama a una acción se despacha (dispatch) para generar un nuevo estado
// con el que se puede re-renderizar el componente.
export function reducer (state: State, action: Action) {
  const { type } = action

  // Intercambiar lenguajes
  if (type === 'INTERCHANGE_LANGUAGES') {
    // Lógica dentro del reducer para evitarlo en los componentes.
    if (state.fromLanguage === AUTO_LANGUAGE) return state

    const loading = state.fromText !== ''

    return {
      ...state,
      loading,
      result: '',
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage
    }
  }

  if (type === 'SET_FROM_LANGUAGE') {
    if ( state.fromLanguage === action.payload ) return state

    const loading = state.fromText !== ''

    return {
      ...state,
      fromLanguage: action.payload,
      result: '',
      loading
    }
  }

  if (type === 'SET_TO_LANGUAGE') {
    if ( state.toLanguage === action.payload ) return state
    const loading = state.fromText !== ''

    return {
      ...state,
      fromLanguage: action.payload,
      result: '',
      loading
    }
  }

  if (type === 'SET_FROM_TEXT') {
    const loading = action.payload !== ''

    return {
      ...state,
      loading,
      fromText: action.payload,
      result: ''
    }
  }

  if (type === 'SET_RESULT') {
    return {
      ...state,
      result: action.payload
    }
  }

  // Si no hay otro tipo, devuelve el mismo estado
  return state
}

// 3. Usar el hook de useReducer
export function useStore () {
  const [{
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading
  }, dispatch] = useReducer(reducer, initialState)

  // No devolver directamente el dispatch a otros componentes.
  // Es mejor exportar un contrato
  const interchangeLanguages = () => {
    dispatch({ type: 'INTERCHANGE_LANGUAGES' })
  }

  const setFromLanguage = (payload: FromLanguage) => {
    dispatch({ type: 'SET_FROM_LANGUAGE', payload })
  }

  const setToLanguage = (payload: Language) => {
    dispatch({ type: 'SET_TO_LANGUAGE', payload })
  }

  const setFromText = (payload: string) => {
    dispatch({ type: 'SET_FROM_TEXT', payload })
  }

  const setResult = (payload: string) => {
    dispatch({ type: 'SET_RESULT', payload })
  }

  return {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult
  }
}
