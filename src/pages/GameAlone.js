import React, { useEffect, useState } from 'react'
import Board from '../components/Board'
import Modal from '../components/Modal'
import { useParams, Link } from 'react-router-dom';

const numeroAleatorio = Math.floor(Math.random() * 101);
let num = 1;

if(numeroAleatorio < 23) num = 1
else if(numeroAleatorio < 46) num = 2
else if(numeroAleatorio < 69) num = 3
else if(numeroAleatorio < 92) num = 4
else num = 5

const GameAlone = () => {

    const { difficulty } = useParams();

    const [ board, setBoard ] = useState([['', '', ''], ['', '', ''], ['', '', '']]);
    const [ types, setTypes ] = useState( Array.from({ length: 9 }, () => Math.floor(Math.random() * 5) + 1) )
    const [ turn, setTurn ] = useState('x');
    const [ winner, setWinner ] = useState(null);

    useEffect(() => {

        setWinner( checkForWinner(board) );

    }, [board]);

    useEffect(() => {
        if(checkForWinner(board) == null){
            
            let bot = easyGame;
            if(difficulty === 'medium') bot = mediumGame;
            else if(difficulty === 'hard') bot = hardGame;
            
            if( turn === 'o' ){
                waitForCallback( bot );
            }

        }
    }, [turn]);

    const handleSelectBox = (row, column) => {
        const aux = [...board];

        aux[row][column] = turn;

        setTurn( turn === 'x' ? 'o' : 'x' );
        setBoard(aux);
    }

    const restartGame = () => {
        setBoard([['', '', ''], ['', '', ''], ['', '', '']]);
        setTurn('x');
        setWinner(null);
        setTypes( Array.from({ length: 9 }, () => Math.floor(Math.random() * 5) + 1) )
        document.querySelector('#board').play();
    }

    /* BOTS */
    const easyGame = () => {
        console.log('HOLA');
        const auxBoard = [];
        for(let i=0 ; i<3 ; i++){
            for(let j=0; j<3 ; j++){
                auxBoard.push( board[i][j] );
            }
        }

        let index = null;
        do{
            index = Math.floor(Math.random() * 9); 
        }while(auxBoard[index] !== '');

        const [row, col] =  [ (Math.floor(index / 3)), (index % 3) ];

        handleSelectBox(row, col);
    }

    const mediumGame = () => {
        console.log('MEDIUM');
    }

    const hardGame = () => {
        console.log('HARD');
    }
    

    return (
        <div className='local-body'>
            <Link className='link-game-back' to='/alone/choose'> Volver Atras </Link>

            <h2 className='player1-turn'>{turn === 'x' ? <u>"Tu turno Jugador (X)"</u> : 'Jugador (X) - Espera a PC'}</h2>

            <Board
                board={board} 
                boardType={num} 
                onSelectBox={handleSelectBox} 
                turn={turn}
                types={types}
                playerCanPlay={turn === 'x'}
            />

            <h2 className='player2-turn'>{turn === 'o' ? <u>Turno de PC (O)</u> : 'PC (O)'}</h2>

            <Modal
                title={winner === '0' ? 'EMPATE' : `${winner === 'x' ? '¡Ganaste!' : 'Ganó PC :('}!`}
                body='¿Quieres jugar de nuevo?'
                acceptText='Aceptar'
                cancelText='Salir'
                onAccept={restartGame}
                onCancel={() => window.location.href = '/'}
                visible={ winner !== null }
            />

        </div>
    )
}

export default GameAlone;

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
    if (empate) return '0';

    return null;
}

function waitForCallback(callback) {
    let time = Math.floor(Math.random() * 2000) + 1500;
  
    setTimeout(() => {
      callback();
    }, time);
  }
  