import { useEffect, useState } from 'react'

// El debounce permite realizar un retardo de peticiones.
/*
    Cómo funciona el debounce:
    0ms --> user types 'h'
      useEffect ... L7
    150ms --> user type 'he'
      clear useEffect - L11
      useEffect ... L7
    300ms --> user type 'hel'
      clear useEffect - L11
      useEffect ... L7
    400ms --> user type 'hell'
      clear useEffect - L11
      useEffect ... L7
    900ms --> L8 --> setDebouncedValue('hell') -> deboucedValue L14
*/
export function useDebounce<T> (value: T, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}
