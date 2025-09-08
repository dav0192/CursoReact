// Los useState son hooks en react
// Agrega funcionalidad a los componentes en react en base a una condición
import { useState } from 'react';
import './App.css';

/*
    Los atributos que reciba cada componente deben ser inmutables (No modificables dentro del componente).
*/
export function TwitterFollowCard({ userName = 'unknown', children, imgSrc }){
    const [isFollowing, setIsFollowing] = useState(false);
    // =
    // const state = useState(false);
    // const isFollowing = state[0];
    // const setIsFollowing = state[1];

    // Al definir estilos dentro de elementos html usar camelCase
    // En React para crear una clase es necesario usar className=""
    const text = isFollowing ? "Siguiendo" : "Seguir";

    const buttonClassName = isFollowing
        ? "tw-followCard-button is-following"
        : "tw-followCard-button";

    const handleClick = () => {
        setIsFollowing(!isFollowing);
    };

    return(
        <article className="tw-followCard">
            <header className='tw-followCard-header'>
                <img
                    className='tw-followCard-avatar'
                    src={`${imgSrc}`}
                    alt="el avatar de midudev"
                />
                <div className='tw-followCard-info'>
                    <strong>{ children }</strong>
                    <span className='tw-followCard-infoUserName'>@{ userName }</span>
                </div>
            </header>
            <aside>
                <button className={buttonClassName} onClick={handleClick}>{ text }</button>
            </aside>
        </article>
    );
}