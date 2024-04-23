import React, { useEffect, useState } from 'react'
import Board from '../components/Board'

const Game = () => {

    const [ board, setBoard ] = useState([['', '', ''], ['', '', ''], ['', '', '']]);
    const [ turn, setTurn ] = useState('o');

    useEffect(() => {

        const winner = checkForWinner(board);
        if( winner !== null ){
            if(winner !== 'empate'){
                alert("El ganador fue: "+winner);
                setBoard([['', '', ''], ['', '', ''], ['', '', '']]);
            }else {
                alert("Empate");
                setBoard([['', '', ''], ['', '', ''], ['', '', '']]);
            }
        }

    }, [board]);

    const handleBoxSelected = (indx1, indx2) => {
        const aux = [...board];
        aux[indx1][indx2] = turn;

        setBoard( aux );
        setTurn( turn === 'o' ? 'x' : 'o' )
    }



    return (
        <div>
            <Board 
                board={board}
                onSelectBox={handleBoxSelected}
                turn={turn}
            />
            <p><big>Turno de <b>{turn}</b></big></p>
        </div>
    )
}

export default Game

function checkForWinner( board ){
    for (let i = 0; i < 3; i++) {
        if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][1] === board[i][2]) return board[i][0];
    }

    for (let i = 0; i < 3; i++) {
        if (board[0][i] !== '' && board[0][i] === board[1][i] && board[1][i] === board[2][i]) return board[0][i]; 
    }

    if (board[0][0] !== '' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) return board[0][0];
    if (board[0][2] !== '' && board[0][2] === board[1][1] && board[1][1] === board[2][0]) return board[0][2];
    
    let empate = true;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                empate = false;
                break;
            }
        }
        if (!empate) break;
    }
    if (empate) return 'empate';

    return null;
}