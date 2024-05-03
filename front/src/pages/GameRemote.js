import React, { useEffect, useState } from 'react'
import '../styles/GameLocal.css'
import Board from '../components/Board'
import Modal from '../components/Modal'
import { Link } from 'react-router-dom';
import { socket } from '../socket'

const GameRemote = ({ game, me, gameCode, amIHost }) => {
    document.title = 'Gatito - Juego en línea'

    const board = game.board;
    const meGame = me.id === game.player1.id ? game.player1 : game.player2;
    const opponentGame = me.id !== game.player1.id ? game.player1 : game.player2;

    window.scrollTo({
        top: 0,
        behavior: 'smooth' 
    });

    const [ types, setTypes ] = useState( Array.from({ length: 9 }, () => Math.floor(Math.random() * 5) + 1) );
    const [ boardType, setBoardType ] = useState(generateBoardType());
    const [ boardWrited, setBoardWrited ] = useState(false);
    
    const [ winnerCell, setWinnerCell ] = useState(null);
    const [ winner, setWinner ] = useState(null);
    const [ canPlay, setCanPlay ] = useState( false );

    const [ itsMyTurn, setItsMyTurn ] = useState(false);


    useEffect(() => {

        function onRestart(){
            setWinnerCell(null);
            setWinner(null);
            setCanPlay(false);
        }

        socket.on('server:restart', onRestart);

        return () => {
            socket.off('server:restart', onRestart);
        }
    }, []);

    useEffect(() => {
        const itIsMyTurn = meGame.icon === game.turn;

        setItsMyTurn(itIsMyTurn);
        setCanPlay( itIsMyTurn );

        setTimeout(() => {
            setWinnerCell(game.winnerCell);
        }, 1500);

        console.log(game.winnerCell);

    }, [game]);


    const handleSelectBox = (row, column) => {        
        
        socket.emit('client:selectBox', {
            gameCode, row, column, player: meGame
        })
    }

    const restartGame = () => {
        

        socket.emit('client:startGame', gameCode, true);
    }

    const nextTurn = () => {
        
    }

    const lineWrited = () => {
        setTimeout(() => {
            setWinner(game.winner);
        }, 500);
    }

    const onBoardWrited = () => {
        const itIsMyTurn = meGame.icon === game.turn;
        setItsMyTurn( itIsMyTurn );
        setCanPlay( itIsMyTurn );

        setBoardWrited(true);
    }
    

    return (
        <div className='local-body'>
            <Link className='link-game-back' to='/connect'> Volver Atras </Link>
            <h2 
                className='player1-turn'
                style={{ color: meGame.icon === 'x' ? '#FF0D00' : '#012CFF' }}
            >{(itsMyTurn) ? <u>{meGame.name} ({meGame.icon}): Tu turno</u> : `[Yo] ${meGame.name} (${meGame.icon})`}</h2>

            <Board
                board={board} 
                boardType={boardType} 
                onSelectBox={handleSelectBox} 
                turn={game.turn}
                types={types}
                canPlay={canPlay}
                setCanPlay={() => {}}
                onEnded={nextTurn}
                winner={winnerCell}
                onBoardWrited={onBoardWrited}
                handleEndedWinLine={lineWrited}
            />

            <h2 
                className='player2-turn'
                style={{ color: opponentGame.icon === 'x' ? '#FF0D00' : '#012CFF' }}
            >{(!itsMyTurn) ? <u>Turno de: {opponentGame.name} ({opponentGame.icon})</u> : `${opponentGame.name} (${opponentGame.icon})`}</h2>
            <p>{ (!itsMyTurn && boardWrited) ? "Espera que tu contrincante haga su movimiento..." : "" }</p>

            {
                amIHost 
                    ? <Modal
                        title={winner === '0' ? 'EMPATE' : winner === meGame.icon ? "Ganaste :)" : "Has perdido :("}
                        body='¿Quieres jugar de nuevo?'
                        acceptText='Volver a jugar'
                        cancelText='Volver a la sala de espera'
                        onAccept={restartGame}
                        onCancel={() => socket.emit('client:backToRoom', gameCode)}
                        visible={ winner !== null }
                    />
                    : <Modal
                        title={winner === '0' ? 'EMPATE' : winner === meGame.icon ? "Ganaste :)" : "Has perdido :("}
                        body='Espera que el host indique jugar de nuevo o volver a la sala de espera, si deseas salir haz click en el boton'
                        acceptText='Volver al menú'
                        onAccept={() => window.location.href = '/connect'}
                        visible={ winner !== null }
                    />
            }

        </div>
    )
}

export default GameRemote;

function generateBoardType(){
    const numeroAleatorio = Math.floor(Math.random() * 51);

    if(numeroAleatorio < 23) return 1
    else if(numeroAleatorio < 46) return 2
    else if(numeroAleatorio < 69) return 3
    else if(numeroAleatorio < 92) return 4
    else return 5;
}