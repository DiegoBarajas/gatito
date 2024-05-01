import React, { useEffect, useRef, useState } from 'react'
import { socket } from '../socket'
import '../styles/ConnectToGame.css'

import Modal from '../components/Modal'
import Button from '../components/Button'

import connectedImg from '../assets/connected.png'
import disconnectedImg from '../assets/disconnected.png'
import { Link, Navigate } from 'react-router-dom'

const ConnectToGame = () => {
    document.title = 'Gatito - Conectar a juego';

    const [ connected, setConnected ] = useState(socket.connected);
    const [ gameCode, setGameCode ] = useState('');
    const [ modal, setModal ] = useState(null);
    const [ navigate, setNavigate ] = useState(null);

    useEffect(() => {
        function onConnect() {
            setConnected(true);
        }
    
        function onDisconnect() {
            setConnected(false);
        }

        function onCreateRoom(data) {
            setNavigate('/game/'+data.gameCode);
        }

        function onCannotConnect(data){
            setModal(data);
        }

        function onRoomJoined(code){
            setNavigate('/game/'+code);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
    
        socket.on('server:createRoom', onCreateRoom);
        socket.on('server:cannotConnect', onCannotConnect);
        socket.on('server:roomJoined', onRoomJoined);
        
        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('server:createRoom', onCreateRoom);
            socket.off('server:cannotConnect', onCannotConnect);
            socket.off('server:roomJoined', onRoomJoined);
        };
    }, []);

    const createRoom = () => {
        socket.emit('client:createRoom');
    }

    const joinRoom = () => {
        socket.emit('client:joinRoom', gameCode);
    }

    const handleChange = (e) => {
        const { value } = e.target;
        const code = value.replace(/-/g, '').slice(0, 8);

        setGameCode( code ) ;
    }

    const handlePressKey = (e) => {
        if(gameCode.length >= 8){
            if(e.key === 'Enter') joinRoom();
        }
    }

    return (
        <div className='connect-body'>
            { navigate === null ? <></> : <Navigate to={navigate}/> }
            <Link className='link-game-back' to='/'> Volver Atras </Link>
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

            <h1 className='title'>Conectar a juego</h1>
            <p className='p-description'>Ingresa en el siguiente campo de texto el codigo del juego (este debio de ser previamente generado por tu contrincante), o crea tu sala haciendo click en el boton "<u onClick={createRoom} style={{ cursor: 'pointer' }}>Crear mi sala</u>".</p>
            <br/>

            <div className='input-game-code'>
                <label htmlFor='game-code-input' className='label-input'>Codigo del juego</label>
                <input
                    id='game-code-input'
                    className='input'
                    type="number"
                    value={gameCode}

                    onChange={handleChange}
                    onKeyDown={handlePressKey}
                />
            </div>
            <Button color='blue' onClick={joinRoom} disabled={( (gameCode.length < 8) || (!connected) )}>Ingresar</Button>

            <br/>
            <br/>
            <br/>
            <br/>
            <br/>

            <Button color='black' onClick={createRoom} disabled={!connected}>Crear mi sala</Button>

            {
                modal === null  
                    ? <></>
                    : <Modal
                        title={modal.title}
                        body={modal.body}
                        onAccept={() => setModal(null)}
                        visible
                      />
            }

        </div>
        )
}

export default ConnectToGame