import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Button from '../components/Button'
import Modal from '../components/Modal';

const Stats = () => {

    const stats = JSON.parse( localStorage.getItem('stats') );
    const [ showModal, setShowModal ] = useState(false);

    const handleClear = () => {
        localStorage.removeItem('stats');
        window.location.reload();
    }

    return (
        <div className='choose-body'>
            <Link className='link-game-back' to='/'> Volver Atras </Link>
            <br/>

            <h1 className='title'>Estadisticas</h1>

            <div className='choose-buttons'>

                <div className='choose-buttons-item'>
                    <h2>Facil</h2>
                    <ul>
                        <li>
                            <p><b>Jugador:</b> {stats === null ? 0 : stats.easy.player}</p>
                        </li>

                        <li>
                            <p><b>PC:</b> {stats === null ? 0 : stats.easy.pc}</p>
                        </li>

                        <li>
                            <p><b>Empatados:</b> {stats === null ? 0 : stats.easy.tie}</p>
                        </li>
                    </ul>
                    
                </div>

                <div className='choose-buttons-item'>
                    <h2>Medio</h2>
                    <ul>
                        <li>
                            <p><b>Jugador:</b> {stats === null ? 0 : stats.medium.player}</p>
                        </li>

                        <li>
                            <p><b>PC:</b> {stats === null ? 0 : stats.medium.pc}</p>
                        </li>

                        <li>
                            <p><b>Empatados:</b> {stats === null ? 0 : stats.medium.tie}</p>
                        </li>
                    </ul>
                    
                </div>

                <div className='choose-buttons-item'>
                    <h2>Dificil</h2>
                    <ul>
                        <li>
                            <p><b>Jugador:</b> {stats === null ? 0 : stats.hard.player}</p>
                        </li>

                        <li>
                            <p><b>PC:</b> {stats === null ? 0 : stats.hard.pc}</p>
                        </li>

                        <li>
                            <p><b>Empatados:</b> {stats === null ? 0 : stats.hard.tie}</p>
                        </li>
                    </ul>
                    
                    <br/>
                </div>
            </div>

            <Modal
                visible={ showModal }
                onCancel={handleClear}
                onAccept={ () => setShowModal(false) }
                cancelText='Borrar'
                acceptText='Cancelar'
                title='¿Seguro que deseas borrar tus estadisticas?'
                body='Se borrarán las estadisticas actuales de tus juegos, ¿Deseas continuar?'
            />
            <Button color='red' onClick={ () => setShowModal(true) }>Borrar Estadisticas</Button>

            <br/>
            <br/>


        </div>    
    )
}

export default Stats