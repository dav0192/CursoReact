import { WINNER_COMBOS } from "../constants";

export const checkWinnerFrom = (boardToCheck) => {
    // Se revisan las combinaciones para ver quien gano
    for(const combo of WINNER_COMBOS){
        const [a, b, c] = combo;
        if(
            boardToCheck[a] &&
            boardToCheck[a] === boardToCheck[b] &&
            boardToCheck[a] === boardToCheck[c]
        ){
            // Devuelve el ganador
            return boardToCheck[a];
        }
    }
    // Si no hay ganador
    return null;
};