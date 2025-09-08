import { TwitterFollowCard } from './TwitterFollowCard';
import './App.css';

/*
    Componente: Función que devuelve un elemento (factoria).
    Elemento: Es lo que se renderiza (Componentes crean elementos y react renderiza elementos).
*/

/*
    El atributo children es aquel que se encuentra dentro de las etiquetas. Ej:
    <button>SOY EL CHILDREN</button>
    Aquí el atributo children es el texto dentro de ambas etiquetas.
    A traves del elemento children se pueden pasar elementos HTML como:
    <button><h1>SOY EL ELEMENTO CHILDREN</h1></button>
*/

export function App(){
    // Se pueden pasar elementos en react
    // const formattedUserName = <span>@midudev</span>;
    // Se pueden pasar funciones
    // const formatUserName = (userName) => `@${userName}`;
    /*
        Para pasar el siguiente objeto como atributo html es necesario que dentro del elemento
        este lo siguiente: {...objeto}. Ej:
        const melonmusk = {isFollowing: true, userName:"melonmusk", imgSrc:"https://i.pinimg.com/564x/8b/b9/22/8bb922e2791365f1b73edb5ee1e8f9f8.jpg"};
        return(<TwitterFollowCard {...melonmusk}></TwitterFollowCard>);
    */
    return(
        <section className='App'>
            <TwitterFollowCard
                isFollowing={true}
                userName="midudev"
                imgSrc="https://avatars.githubusercontent.com/u/1561955?v=4"
            >Miguel Ángel Durán</TwitterFollowCard>
            <TwitterFollowCard
                isFollowing={false}
                userName="pheralb"
                imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrWCfadBOtUGta1YeOfW9xdamAgKFV3ZPI3Q&s"
            >Pablo Hernández</TwitterFollowCard>
            <TwitterFollowCard
                isFollowing={true}
                userName="melonmusk"
                imgSrc="https://i.pinimg.com/564x/8b/b9/22/8bb922e2791365f1b73edb5ee1e8f9f8.jpg"
            >Melon Musk</TwitterFollowCard>
            <TwitterFollowCard
                isFollowing={false}
                userName="vxnder"
                imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9tfN1q8PSPfOmRWTbHpztu1LVaHbnZP01nQ&s"
            >Vander Heart</TwitterFollowCard>
        </section>
    );
}