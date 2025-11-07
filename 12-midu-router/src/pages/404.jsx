import { Link } from '../components/Link.jsx'

export default function Page404 () {
  return (
    <>
      <h1>Error 404</h1>
      <img src="https://miro.medium.com/0*ZjYSm_q36J4KChdn" alt="This is fine meme" style={{ width: '300px', height: '300px', border: '1px solid black' }}/><br/>
      <p>Recurso no encontrado</p>
      <Link to='/'>Volver al Inicio</Link>
    </>
  )
}
