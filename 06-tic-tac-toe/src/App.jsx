import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Square } from './components/Square.jsx';
import { TURNS } from './constants.js';
import { checkWinnerFrom } from './logic/board.js';
import { WinnerModal } from './components/WinnerModal.jsx';
import { saveGameToStorage, resetGameStorage } from './logic/storage/index.js';

/*
    Los hooks no pueden estar dentro de un if ya que react guarda los useState
    en un Array interno en memoria.
*/

/*
    useEffect: Permite ejecutar código arbitrario cuando se monta el componente en el
    DOM y cada vez que se cambian las dependencias.
*/

function App(){
    // Estado para representar el tablero
    const [board, setBoard] = useState(() => {
        console.log("Inicializando estado");
        const boardFromStorage = window.localStorage.getItem('board');
        return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null);
    });
    // Estado para saber de quien es el turno
    const [turn, setTurn] = useState(() => {
        const turnFromStorage = window.localStorage.getItem("turn");
        // return turnFromStorage || TURNS.X; Comprueba si es false
        return turnFromStorage ?? TURNS.X; // Comprueba si es undefined
    });

    // Null no hay ganador y false indica un empate.
    const [winner, setWinner] = useState(null);

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setTurn(TURNS.X);
        setWinner(null);
        // Eliminando los datos almacenados en el localStorage
        resetGameStorage();
    };

    const checkEndGame = (newBoard) => {
        return newBoard.every((square) => square !== null);
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
        // Guadar partida aqui
        saveGameToStorage({
            board: newBoard,
            turn: newTurn,
        });
        // Revisar si hay un ganador
        const newWinner = checkWinnerFrom(newBoard);
        if(newWinner){
            confetti();
            // Actualiza el estado
            setWinner(newWinner); // No es SINCRONO
        }else if(checkEndGame(newBoard)){
            setWinner(false); // Empate
        }
    }

    return (
        <main className='board'>
            <h1>Tic Tac Toe (Gato)</h1>
            <button onClick={resetGame}>Reiniciar el Juego</button>
            {/*
                Importante diferencia el paso de la funcion: funcion_ejemplo
                A pasar y ejecutar la función: funcion_ejemplo()
            */}
            <section className='game'>
                {
                    board.map((square, index) => {
                        return (
                            <Square
                                key={index}
                                index={index}
                                updateBoard={updateBoard}
                            >
                                {square}
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

            <WinnerModal resetGame={resetGame} winner={winner}></WinnerModal>
        </main>
    );
}

// Exporta la función
export default App;