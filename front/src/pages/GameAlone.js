import React, { useEffect, useState } from 'react'
import Board from '../components/Board'
import Modal from '../components/Modal'
import { useParams, Link } from 'react-router-dom';

import minimax from '../algorithms/minimax';
import pseudoRandom from '../algorithms/pseudoRandom';
import random from '../algorithms/randomSelection';

const GameAlone = () => {

    const { difficulty } = useParams();
    
    const [ settings ] = useState( getSettings() );
    const [ board, setBoard ] = useState([['', '', ''], ['', '', ''], ['', '', '']]);
    const [ types ] = useState( Array.from({ length: 9 }, () => Math.floor(Math.random() * 5) + 1) );
    const [ boardType ] = useState(generateBoardType());
    const [ winnerCell, setWinnerCell ] = useState(null);

    const [ player ] = useState( getPlayer(settings.player) );
    const [ pc ] = useState( getPc(player) );

    const [ turn, setTurn ] = useState( whoStarts(settings.starts, player, pc) );
    const [ winner, setWinner ] = useState(null);
    const [ canPlay, setCanPlay ] = useState( false );


    const handleSelectBox = (row, column) => {
        const aux = [...board];
        aux[row][column] = turn;

        setBoard(aux);
        setCanPlay(false);
    }

    useEffect(() => {

        if( isBoardEmpty(board) )return;
        nextPlay();

    }, [turn]);
    
    const nextTurn = () => {
        const win = checkForWinner( board );

        if(win === null){
            const next = turn === 'x' ? 'o' : 'x';
            setTurn( next );       
        }else{
            setWinnerCell( getWinnerCell(board) );
            setWinner(null)
            setCanPlay(false);
        }   
    }

    const nextPlay = () => {
        if(turn === pc){

            if(difficulty === 'hard') 
                waitForCallback(() => {
                    const [row, col] = minimax(board, pc);
                    handleSelectBox(row, col);
                });
            else if(difficulty === 'medium') 
                waitForCallback(() => {
                    const [row, col] = pseudoRandom(board, pc);
                    handleSelectBox(row, col);
                });
            else 
                waitForCallback(() => {
                    const [row, col] = random(board);
                    handleSelectBox(row, col);
                });

        }else{
            setCanPlay(true);
        }
    }

    const restartGame = () => {
        window.location.reload();
    }

    const onBoardWrited = () => {
        nextPlay();
    }

    const lineWrited = () => {
        const win = checkForWinner(board);

        let stats = JSON.parse( localStorage.getItem('stats') );
        if(stats === null){
            localStorage.setItem('stats', JSON.stringify(
                {
                    easy: {
                        pc: 0,
                        player: 0,
                        tie: 0
                    },
                    medium: {
                        pc: 0,
                        player: 0,
                        tie: 0
                    },
                    hard: {
                        pc: 0,
                        player: 0,
                        tie: 0
                    }
                }
            ));

            stats = JSON.parse( localStorage.getItem('stats') );
        }

        let diff = 'easy';
        if(difficulty === 'medium') diff = 'medium';
        else if(difficulty === 'hard') diff = 'hard';

        if(win === player){
            stats[diff]['player'] = (stats[diff]['player'] + 1);
        }else if(win === pc){
            stats[diff]['pc'] = (stats[diff]['pc'] + 1);
        }else {
            stats[diff]['tie'] = (stats[diff]['tie'] + 1);
        }

        localStorage.setItem('stats', JSON.stringify(stats));

        setTimeout(() => {
            setWinner(win);
        }, 1000);
    }

    return (
        <div className='local-body'>
            <Link className='link-game-back' to='/alone/choose'> Volver Atras </Link>

            <h2 className='title-game'>{translateDifficulty(difficulty)}</h2>

            <div className='space-game'></div>


            <h2 className='player1-turn' style={{ color: player === 'x' ? '#FF0D00' : '#012CFF' }}>{turn === player ? <u>Tu turno {settings.playerName} ({player})</u> : `${settings.playerName}(${player}) - Espera a PC`}</h2>

            <Board
                board={board} 
                boardType={boardType} 
                onSelectBox={handleSelectBox} 
                turn={turn}
                types={types}
                canPlay={canPlay}
                setCanPlay={setCanPlay}
                onEnded={nextTurn}
                onBoardWrited={onBoardWrited}
                winner={winnerCell}
                handleEndedWinLine={lineWrited}
            />

            <h2 className='player2-turn' style={{ color: pc === 'x' ? '#FF0D00' : '#012CFF' }}>{turn === pc ? <u>Turno de PC ({pc})</u> : `PC (${pc})`}</h2>



            <Modal
                title={winner === '0' ? 'EMPATE' : `${winner === player ? '¡Ganaste!' : 'Ganó PC :('}`}
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
    let time = Math.floor(Math.random() * 2000);
  
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

function isBoardEmpty(board){
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(board[i][j] !== '') return false;
        }
    }

    return true;
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