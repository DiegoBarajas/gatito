import React, { useEffect, useState } from 'react'
import '../styles/GameLocal.css'
import Board from '../components/Board'
import Modal from '../components/Modal'
import { Link } from 'react-router-dom';

const numeroAleatorio = Math.floor(Math.random() * 101);
let num = 1;

if(numeroAleatorio < 23) num = 1
else if(numeroAleatorio < 46) num = 2
else if(numeroAleatorio < 69) num = 3
else if(numeroAleatorio < 92) num = 4
else num = 5

const GameLocal = () => {

    const [ board, setBoard ] = useState([['', '', ''], ['', '', ''], ['', '', '']]);
    const [ types, setTypes ] = useState( Array.from({ length: 9 }, () => Math.floor(Math.random() * 5) + 1) );
    const [ boardType, setBoardType ] = useState(generateBoardType());
    const [ winnerCell, setWinnerCell ] = useState(null);

    const [ turn, setTurn ] = useState( 'x' );
    const [ winner, setWinner ] = useState(null);
    const [ canPlay, setCanPlay ] = useState( false );

    const handleSelectBox = (row, column) => {
        const aux = [...board];
        aux[row][column] = turn;

        setBoard(aux);
        setCanPlay(false);
    }

    const restartGame = () => {
        window.location.reload();
    }

    const nextTurn = () => {
        const win = checkForWinner( board );

        if(win === null){
            const nextTurn = turn === 'x' ? 'o' : 'x';
            setTurn( nextTurn );
            setCanPlay(true);
        }else{
            setWinnerCell( getWinnerCell(board) );
            setWinner(null)
            setCanPlay(false);
        }   
    }

    const lineWrited = () => {
        const win = checkForWinner(board);

        setTimeout(() => {
            setWinner(win);
        }, 1000);
    }
    

    return (
        <div className='local-body'>
            <Link className='link-game-back' to='/'> Volver Atras </Link>
            <h2 className='player1-turn'>{turn === 'x' ? <u>Jugador 1 (X): Tu turno</u> : 'Jugador 1 (X)'}</h2>

            <Board
                board={board} 
                boardType={boardType} 
                onSelectBox={handleSelectBox} 
                turn={turn}
                types={types}
                canPlay={canPlay}
                setCanPlay={setCanPlay}
                onEnded={nextTurn}
                winner={winnerCell}
                handleEndedWinLine={lineWrited}
            />

            <h2 className='player2-turn'>{turn === 'o' ? <u>Jugador 2 (O): Tu turno</u> : 'Jugador 2 (O)'}</h2>

            <Modal
                title={winner === '0' ? 'EMPATE' : `¡El ganador fue ${winner === 'x' ? 'Jugador 1' : 'Jugador 2'}!`}
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

export default GameLocal;

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

function translateDifficulty(difficulty) {
    if(difficulty === 'medium') return 'DIFICULTAD MEDIA'
    else if(difficulty === 'hard') return "DIFICULTAD DIFICIL"
    else return "DIFICULTAD FACIL"
}
  

function getPlayer(player){
    if(player === 'r') return Math.random() < 0.5 ? 'x' : 'o';
    else return player;
}

function getPc(player){
    return player === 'x' ? 'o' : 'x';
}

function whoStarts(starts, player, pc){
    if(starts === 'random') return Math.random() < 0.5 ? player : pc;
    else if(starts === 'player') return player;
    else return pc;
}

function generateBoardType(){
    const numeroAleatorio = Math.floor(Math.random() * 101);

    if(numeroAleatorio < 23) return 1
    else if(numeroAleatorio < 46) return 2
    else if(numeroAleatorio < 69) return 3
    else if(numeroAleatorio < 92) return 4
    else return 5;
}

function getWinnerCell(board){
    for (let i = 0; i < 3; i++) {
        if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][1] === board[i][2]) return i+1;
    }
    
    for (let i = 0; i < 3; i++) {
        if (board[0][i] !== '' && board[0][i] === board[1][i] && board[1][i] === board[2][i]) return i+4; 
    }
    
    if (board[0][0] !== '' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) return 7;
    if (board[0][2] !== '' && board[0][2] === board[1][1] && board[1][1] === board[2][0]) return 8;
        
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
    if (empate) return 0;
    
    return null;
}

function getSettings(){
    const settings = JSON.parse(localStorage.getItem('settings'));

    if( settings === null ){
        const settJson = {
            player: 'x',
            playerName: 'Jugador',
            starts: 'player'
        }

        localStorage.setItem('settings', JSON.stringify(settJson));
        return settJson;
    }

    return settings;
}