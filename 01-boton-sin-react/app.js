// VanillaJs
// Función que se ejecuta despues de cargar la página
// Función para varios botones
function principal(){
    // Recuperamos todos los botones
    const buttons = document.querySelectorAll("button");
    // Recorremos todos los botones y agregamos los event listener
    buttons.forEach(button => {
        // Al hacer clic en el botón ejecuta la acción
        button.addEventListener("click", function (){
            // Recupera el id del atributo HTML
            const id = button.getAttribute("data-id");
            // Llamar al servicio para actualizar el si me gusta
            // togglelike()
            if(button.classList.contains("liked")){
                button.classList.remove("liked");
                button.innerText = "Me gusta";
            }else{
                button.classList.add("liked");
                button.innerText = "Quitar me gusta";
            }
        });
    });
}

/* Función para solo un botón
function principal(){
    // Recuperamos el botón
    const button = document.querySelector("button");
    // Al hacer clic en el botón ejecuta la acción
    button.addEventListener("click", function (){
        // Recupera el id del atributo HTML
        const id = button.getAttribute("data-id");

        // Llamar al servicio para actualizar el si me gusta
        // togglelike()
        if(button.classList.contains("liked")){
            button.classList.remove("liked");
            button.innerText = "Me gusta";
        }else{
            button.classList.add("liked");
            button.innerText = "Quitar me gusta";
        }
    });
}
*/

document.addEventListener("DOMContentLoaded", principal);