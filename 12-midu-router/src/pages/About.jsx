import { Link } from '../components/Link.jsx'

const i18n = {
  es: {
    title: 'Sobre mí',
    description: 'Hola, soy David y estoy creando un clon del Midu Router.',
    link: 'Volver al inicio.'
  },
  en: {
    title: 'About me',
    description: `Hello, my name is David and I'am creating a clone of Midu Router.`,
    link: 'Return to the Homepage.'
  }
}

const useI18n = (lang) => {
  return i18n[lang] || i18n.en
}

export default function AboutPage ({ routeParams }) {
  const i18n = useI18n(routeParams.lang ?? 'es')
  return (
    <>
      <h1>{i18n.title}</h1>
      <div>
        <img src="https://img.freepik.com/vector-gratis/robot-vectorial-graident-ai_78370-4114.jpg?semt=ais_hybrid&w=740&q=80" alt="Imagen de perfil de David" style={{ width: '300px', height: '300px', border: '1px solid black' }}/>
        <p>{i18n.description}</p>
        <Link to='/'>{i18n.link}</Link>
      </div>
    </>
  )
}
