import React, { useEffect, useState } from 'react'
import { socket } from '../socket'
import '../styles/ConnectToGame.css'

import Button from '../components/Button'

import connectedImg from '../assets/connected.png'
import disconnectedImg from '../assets/disconnected.png'
import { Link, useParams, Navigate } from 'react-router-dom'
import Modal from '../components/Modal'

import xImg from '../assets/x.png';
import oImg from '../assets/o.png';
import hostImg from '../assets/host.png';
import opponentImg from '../assets/opponent.png';
import randomImg from '../assets/question.png';
import Message from '../components/Message'
import GameRemote from './GameRemote'

const Room = () => {
    const { gameCode } = useParams();
    document.title = `Gatito - Sala de espera ${gameCode}`;

    const [ isMounted, setIsMounted ] = useState(false);
    const [ connected, setConnected ] = useState(socket.connected);
    const [ navigate, setNavigate ] = useState(null);
    const [ canBeHere, setCanBeHere ] = useState({id: '', can: true, title: "Espera un momento", body: "Cargando información, espera un momento."});
    
    const [ config, setConfig ] = useState({});
    const [ amIHost, setAmIHost ] = useState(false);
    const [ willExpeled, setWillExpeled ] = useState(false);
    const [ expeled, setExpeled ] = useState(false);
    
    const [ me, setMe ] = useState({});
    const [ opponent, setOpponent ] = useState({});

    const [ message, setMessage ] = useState(null);

    const [ game, setGame ] = useState(null);

    useEffect(() => {
        function onConnect() {
            setConnected(true);
        }
    
        function onDisconnect() {
            setConnected(false);
        }
    
        function onUpdateConfig(config) {
            setConfig(config);            
        }
    
        function onCanBeHere(can){
            setCanBeHere(can);
        }
    
        function onRoomConfig(config){
            setConfig(config);
        }

        function onSendMessage(message){
            updateMessage(message);
        }

        function onExpelPlayer(){
            setExpeled(true);
        }
    
        socket.emit('client:canBeHere', gameCode);
        socket.emit('client:getConfig', gameCode);

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
    
        socket.on('server:updateConfig', onUpdateConfig);
        socket.on('server:canBeHere', onCanBeHere);
        socket.on('server:roomConfig', onRoomConfig);
        socket.on('server:sendMessage', onSendMessage);
        socket.on('server:expelPlayer', onExpelPlayer);

        setIsMounted(true);  

        return () => {
            if (isMounted) {
                socket.off('connect', onConnect);
                socket.off('disconnect', onDisconnect);
                
                socket.off('server:updateConfig', onUpdateConfig);
                socket.off('server:canBeHere', onCanBeHere);
                socket.off('server:roomConfig', onRoomConfig);
                socket.off('server:sendMessage', onSendMessage);
                socket.off('server:expelPlayer', onExpelPlayer);

                leaveRoom();
            }
        };
    }, [gameCode, isMounted]);

    useEffect(() => {

        if(isMounted){

            if(config.game === undefined) setGame(null);
            else setGame(config.game)

            if(config.player1.id === socket.id){ 
                setMe(config.player1);
                setOpponent(config.player2);
            }else if(config.player2.id === socket.id){ 
                setMe(config.player2);
                setOpponent(config.player1);
            }
    
            if(config.host === socket.id){
                setAmIHost(true);
            }else{
                setAmIHost(false);
            }
        }
        
    }, [config]);

    useEffect(() => {


    }, [message])

    const updateMessage = (newMessage) => {
        setMessage(null);
        setMessage(newMessage);
    };    
    

    const startGame = () => {
        socket.emit('client:startGame', gameCode)
    }

    const leaveRoom = () => {
        socket.emit('client:leaveRoom', gameCode);
    }

    const chooseIcon = (newIcon) => {
       socket.emit('client:updateIcon',{
            gameCode,
            newIcon
       });
    }

    const chooseStarts = (starts) => {
        socket.emit('client:updateStarts', {
            gameCode,
            starts
        })
    }

    return canBeHere === true
        ? game === null
            ? (
                <div className='connect-body'>
                    { navigate === null ? <></> : <Navigate to={navigate}/> }
                    {
                        <Modal 
                            title='El host te ha expulsado de la partida'
                            body='Lo sentimos, el host ha decidido expulsarte de la partida'
                            onAccept={() => setNavigate('/connect')}
                            visible={expeled}
                        />
                    }
                    <Link className='link-game-back' to='/connect'> Salir de la partida </Link>
                    <br/>
        
                    <div className='server-status'>
                        <div className='server-status-child'>
                            <p className='server-status-title'><b>Estatus del servidor</b></p>
                        </div>
                        <div className='server-status-child'>
                            <img src={ connected ? connectedImg : disconnectedImg } alt='?' className='server-status-img'/>
                            <p>{connected ? "Conectado" : "No Conectado"}</p>
                        </div>
                    </div>
        
                    <h1 className='title'>Sala de espera</h1>
                    <h2 className='h2-gamecode'>Codigo del juego: {gameCode}</h2>
                    <p className='p-description-c'>
                        Comparte este codigo con tu contrincante para poder jugar
                        <br/><b>NOTA:</b> <u>Cuidado al reiniciar la página la sala puede expirar.</u>
                    </p>
        
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'start', flexDirection: 'column', width: '100%' }} >
                            <label htmlFor='inptPlayer1' className='label-input'>Nombre </label>
                            <input
                                id='inptPlayer1'
                                className='input'
                                type='text'
                                value={me.name || ''}
        
                                onChange={(e) => socket.emit('client:updateConfig', {
                                    gameCode,
                                    key: 'name',
                                    value: e.target.value
                                })}
                            />
                        </div>
        
                        <br/>
                        
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'start', flexDirection: 'column', width: '100%' }} >
                            <label className='label-input label-input-disabled'>Contrincante </label>
                            <input
                                className='input-disabled'
                                type='text'
                                value={opponent.name || ''}
                                disabled
                            />
                        </div>
                        { amIHost ? <Button onClick={() => setWillExpeled(true)} disabled={(opponent.id === null)} style={{ marginTop: '10px' }} color='red'>Expulsar oponente</Button> : <></> }
                        <Modal
                            title='¿Deseas expulsar a tu oponente?'
                            acceptText='Aceptar'
                            cancelText='Cancelar'
                            onAccept={() => {
                                socket.emit('client:expelOpponent', gameCode);
                                setWillExpeled(false);
                            }}
                            onCancel={() => setWillExpeled(false)}
                            visible={willExpeled}
                        />
                    </div>
        
                    <br/>
                    <br/>
        
                    <label className='label-input'>Iconos de los jugadores </label>            
                    <div className='choose-icon-container'>
                        
                        <Button className={`choose-icon-btn ${me.icon === 'x' ? 'choose-icon-btn-variant-x' : '' }`} disabled={!amIHost} onClick={() => chooseIcon('x')}>
                            <img src={xImg} alt='X' />
                            {me.icon === 'x' ? 'X (Yo)' : 'X'}
                        </Button>
        
                        <Button className={`choose-icon-btn ${me.icon === 'o' ? 'choose-icon-btn-variant-o' : '' }`} disabled={!amIHost} onClick={() => chooseIcon('o')}>
                            <img src={oImg} alt='X' />
                            {me.icon === 'o' ? 'O (Yo)' : 'O'}
                        </Button>
        
                        <Button className={`choose-icon-btn ${me.icon === 'r' ? 'choose-icon-btn-variant-r' : '' }`} disabled={!amIHost} onClick={() => chooseIcon('r')}>
                            <img src={randomImg} alt='X' />
                            Aleatorio
                        </Button>
                            
                    </div>
        
                    <br/>
                    <br/>
        
                    <label className='label-input'>¿Quién empieza? </label>            
                    <div className='choose-icon-container'>
                        
                        <Button className={`choose-icon-btn ${config.starts === 'host' ? 'choose-icon-btn-variant-r' : '' }`} disabled={!amIHost} onClick={() => chooseStarts('host')}>
                            <img src={hostImg} alt='X' />
                            { amIHost ?  'Yo' : 'Host'}
                        </Button>
        
                        <Button className={`choose-icon-btn ${config.starts === 'opponent' ? 'choose-icon-btn-variant-r' : '' }`} disabled={!amIHost} onClick={() => chooseStarts('opponent')}>
                            <img src={opponentImg} alt='X' />
                            { !amIHost ?  'Yo' : 'Oponente'}
        
                        </Button>
        
                        <Button className={`choose-icon-btn ${config.starts === 'r' ? 'choose-icon-btn-variant-r' : '' }`} disabled={!amIHost} onClick={() => chooseStarts('r')}>
                            <img src={randomImg} alt='X' />
                            Aleatorio
                        </Button>
                            
                    </div>
        
        
                    <br/>
                    <br/>
                    <br/>
                    
                    {amIHost ? <Button color='blue' onClick={startGame} disabled={ ((!amIHost) || (!connected) || (opponent.id === null)) }>Iniciar Juego</Button> :<p>Espera que el host comience el juego...</p>}
                    { opponent.id === null ? <p>Espera que se conecte tu oponente</p> : <></> }
        
                    <br/>
                    <br/>
                    <br/>
        
                    { message === null ? <></> : <Message onTransitionEnd={() => setMessage(null)}>{message}</Message> }
        
                </div>
            
            ) : <GameRemote
                    game={game}
                    me={me}
                    gameCode={gameCode}
                    amIHost={amIHost}
                />
     : (
        <>
            { navigate === null ? <></> : <Navigate to={navigate}/> }
            <Modal
                visible
                title={canBeHere.title}
                body={canBeHere.body}
                onAccept={() => setNavigate('/connect')}
                acceptText='Volver atras'
            />
        </>
    )
}

export default Room;