import { TwitterFollowCard } from './TwitterFollowCard';
import './App.css';

/*
    Cuida que el nombre de la función coincida con el nombre del archivo al momento de exportar e importar
    la función en otro archivo.
*/
export function App(){
    // Pasando listas de usuarios a los componentes
    const users = [
        {
            userName: "midudev",
            name: "Miguel Ángel Durán",
            initialIsFollowing: true,
            imgSrc: "https://avatars.githubusercontent.com/u/1561955?v=4"
        },{
            userName: "pheralb",
            name: "Pablo Hernández",
            initialIsFollowing: false,
            imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrWCfadBOtUGta1YeOfW9xdamAgKFV3ZPI3Q&s"
        },{
            userName: "melonmusk",
            name: "Melon Musk",
            initialIsFollowing: true,
            imgSrc: "https://i.pinimg.com/564x/8b/b9/22/8bb922e2791365f1b73edb5ee1e8f9f8.jpg"
        },{
            userName: "vxnder",
            name: "Vander Heart",
            initialIsFollowing: false,
            imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9tfN1q8PSPfOmRWTbHpztu1LVaHbnZP01nQ&s"
        }
    ];

    // Si se necesita renderizar una lista de elementos hay que usar JavaScript
    // Minuto del curso en el que te quedaste 02:17:30

    /*
        Cuando se renderiza una lista de elementos es necesario que generemos una key
        para cada elemento. El identificador debe ser unico para evitar duplicaciones
        o problemas de renderizacion. Si utilizas el index es necesario que tenga los
        mismos indices. Puedes usar ID de la BD o crear un identificador unico.
        Es ideal usar un ID de BD.
    */
    return(
        <section className='App'>
            {
                users.map(user => {
                    const {userName, name, isFollowing, imgSrc} = user;
                    return(
                        <TwitterFollowCard
                            key={userName}
                            initialIsFollowing={isFollowing}
                            userName={userName}
                            imgSrc={imgSrc}
                        >{name}</TwitterFollowCard>
                    );
                })
            }
        </section>
    );
}