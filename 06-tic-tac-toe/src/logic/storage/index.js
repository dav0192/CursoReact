export const saveGameToStorage = ({ board, turn }) => {
    // Guardar la partida
    // El board es un arreglo
    window.localStorage.setItem("board", JSON.stringify(board));
    // El turn es un caracter
    window.localStorage.setItem("turn", turn);
}

export const resetGameStorage = () => {
    window.localStorage.removeItem("board");
    window.localStorage.removeItem("turn");
}