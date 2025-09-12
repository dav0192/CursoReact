import { useState } from 'react';

const TURNS = {
    X: 'x',
    O: 'o'
};

const Square = ({ children, isSelected, updateBoard, index }) => {
    const className = `Square ${isSelected ? 'is-selected' : ''}`;

    const handleClick = () => {
        updateBoard(index);
    }

    return (
        <div onClick={handleClick} className={className}>
            {children}
        </div>
    );
}

const WINNER_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function App(){
    // Estado para representar el tablero
    const [board, setBoard] = useState(Array(9).fill(null));
    // Estado para saber de quien es el turno
    const [turn, setTurn] = useState(TURNS.X);

    // Null no hay ganador y false indica un empate.
    const [winner, setWinner] = useState(null);

    const checkWinner = (boardToCheck) => {
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

    const updateBoard = (index) => {
        // No se actualiza la posición si ya contiene un simbolo
        if(board[index] || winner) return;
        // Actualiza el tablero
        const newBoard = [...board];
        newBoard[index] = turn;
        setBoard(newBoard) // ASINCRONO
        // Cambiar el turno
        const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
        setTurn(newTurn);
        // Revisar si hay un ganador
        const newWinner = checkWinner(newBoard);
        if(newWinner){
            // Actualiza el estado
            setWinner(newWinner); // No es SINCRONO
        }
    }

    return (
        <main className='board'>
            <h1>Tic Tac Toe (Gato)</h1>
            {/*
                Importante diferencia el paso de la funcion: funcion_ejemplo
                A pasar y ejecutar la función: funcion_ejemplo()
            */}
            <section className='game'>
                {
                    board.map((_, index) => {
                        return (
                            <Square
                                key={index}
                                index={index}
                                updateBoard={updateBoard}
                            >
                                {board[index]}
                            </Square>
                        );
                    })
                }
            </section>

            <section className="turn">
                <Square isSelected={turn === TURNS.X}>
                    {TURNS.X}
                </Square>
                <Square isSelected={turn === TURNS.O}>
                    {TURNS.O}
                </Square>
            </section>
        </main>
    );
}

// Exporta la función
export default App;