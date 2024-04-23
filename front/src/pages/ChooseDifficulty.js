import React, { useEffect, useState } from 'react'
import '../styles/ChooseDifficulty.css'
import Button from '../components/Button'
import { Link } from 'react-router-dom'

import easyImg from '../assets/easy.png'
import midImg from '../assets/mid.png'
import hardImg from '../assets/hard.png'
import settingsimg from '../assets/settings.jpg'
import Input from '../components/Input'
import RadioButton from '../components/RadioButton'

const ChooseDifficulty = () => {

    const [ showModal, setShowModal ] = useState(false);
    const [ simbolChecked, setSimbolChecked ] = useState( [true, false, false] );
    const [ startsChecked, setStartsChecked ] = useState( [true, false, false] );

    
    let settings = JSON.parse( localStorage.getItem('settings') );

    useEffect(() => {
        
        if( settings === null ){
            const settJson = {
                player: 'x',
                playerName: 'Jugador',
                starts: 'player'
            }

            localStorage.setItem('settings', JSON.stringify(settJson));
            settings = JSON.parse( localStorage.getItem('settings') );
        }else{
            switch(settings.player){
                case 'x': setSimbolChecked([true, false, false]); break;
                case 'o': setSimbolChecked([false, true, false]); break;
                default: setSimbolChecked([false, false, true]); break;
            }

            switch(settings.starts){
                case 'player': setStartsChecked([true, false, false]); break;
                case 'pc': setStartsChecked([false, true, false]); break;
                default: setStartsChecked([false, false, true]); break;
            }
        }

    }, []);

    const handleSaveSettings = () => {

        let name = document.querySelector('#inputName').value;
        if(name === '') name = 'Jugador';

        settings.playerName = name; 
        switch(simbolChecked.findIndex(item => item === true)){
            case 0: settings.player = 'x'; break;
            case 1: settings.player = 'o'; break;
            case 2: settings.player = 'r'; break;
        }

        switch(startsChecked.findIndex(item => item === true)){
            case 0: settings.starts = 'player'; break;
            case 1: settings.starts = 'pc'; break;
            case 2: settings.starts = 'random'; break;
        }
        
        localStorage.setItem('settings', JSON.stringify(settings));
        setShowModal(false);
    }

    const handleRestore = () => {
        const settJson = {
            player: 'x',
            playerName: 'Jugador',
            starts: 'player'
        }

        localStorage.setItem('settings', JSON.stringify(settJson));
        settings = JSON.parse( localStorage.getItem('settings') );


        setShowModal(false);
        window.location.reload();
    }

    const handleCheck = (index) => {
        const aux = [false, false, false];
        aux[index] = true;

        setSimbolChecked(aux);
    }

    const handleCheck2 = (index) => {
        const aux = [false, false, false];
        aux[index] = true;

        setStartsChecked(aux);
    }

    return (
        <div className='choose-body'>
            <Link className='link-game-back' to='/'> Volver Atras </Link>
            <br/>

            <div className='settings-buton-container'>
                <Button className='settings-buton' onClick={() => setShowModal(true)}>
                    <img src={settingsimg} alt='Stats' />
                    Configuración
                </Button>
            </div>


            <h1 className='title'>Elige una dificultad</h1>

            <div className='choose-buttons'>

                <div className='choose-buttons-item'>
                    <img src={easyImg} alt='FACIL' className='choose-buttons-img'/>
                    <h2>Facil</h2>
                    <p>Modo para principiantes, ideal si estas aprendiendo a jugar este complicado juego. En el modo facil la dificultad es facil, por lo que ganar será facil, por consecuencia es el modo menos dificil.</p>
                    <br/>
                    <Link className='link-choose-item' to='/alone/easy'> <Button color='blue'>Jugar en Facil</Button> </Link>
                </div>

                <div className='choose-buttons-item'>
                    <img src={midImg} alt='MEDIO' className='choose-buttons-img'/>
                    <h2>Medio</h2>
                    <p>Modo para personas mas experimentadas, se podria decir que un mid level o nivel medio es alguien que es promedio, para llegar a este nivel requieres de al menos 15 años de entrenamiento.</p>
                    <br/>
                    <Link className='link-choose-item' to='/alone/medium'> <Button color='black'>Jugar en Medio</Button> </Link>
                </div>

                <div className='choose-buttons-item'>
                    <img src={hardImg} alt='DIFICIL' className='choose-buttons-img'/>
                    <h2>Dificil</h2>
                    <p>Para poder jugar en este modo debes ser una computadora o un chino (o sea lo mismo), con esta dificultad deberas prepararte para ser brutalmente humillado por un conjuntos de ceros y unos.</p>
                    <br/>
                    <Link className='link-choose-item' to='/alone/hard'> <Button color='red'>Jugar en DIFICIL</Button> </Link>
                </div>

            </div>


            {
                !showModal ? <></>
                : <div className='modal-body' style={{ overflowY: 'hidden', width: 'max-content', minWidth: '100vw', minHeight: '100vh', height: '100%' }}>
                    <div className="hoja" style={{ height: '75%', maxHeight: '75%', overflowY: 'auto'}}>
                        <div className='content-hoja'>
                            <h2>Configuración del juego</h2>
                            
                            <br/>
                            
                            <Input 
                                id='inputName'
                                label='Nombre: '
                                value={settings.playerName}
                            />
                            <br/>

                            <label className='label-input'>Elige tu simbolo:</label>
                            <div className='list-options-rb'>
                                <div className='item-list-rb'>
                                    <p style={{ color: '#FF0D00' }}>{ simbolChecked[0] ? <u>X</u> :  "X"}</p>
                                    <RadioButton 
                                        variant='1'
                                        checked={simbolChecked[0]}
                                        setChecked={handleCheck}
                                        index='0'
                                    />
                                </div>

                                <div className='item-list-rb'>
                                    <p style={{ color: '#012CFF' }}>{ simbolChecked[1] ? <u>O</u> :  "O"}</p>
                                    <RadioButton 
                                        variant='2'
                                        checked={simbolChecked[1]}
                                        setChecked={handleCheck}
                                        index='1'
                                    />
                                </div>

                                <div className='item-list-rb'>
                                    <p style={{ color: '#41403E' }}>{ simbolChecked[2] ? <u>Aleatorio</u> :  "Aleatorio"}</p>
                                    <RadioButton 
                                        variant='3'
                                        checked={simbolChecked[2]}
                                        setChecked={handleCheck}
                                        index='2'
                                    />
                                </div>
                                
                            </div>
                            <br/>


                            <label className='label-input'>Elige quien empieza la partida:</label>
                            <div className='list-options-rb'>
                                <div className='item-list-rb'>
                                    <p style={{ color: '#41403E' }}>{ startsChecked[0] ? <u>Yo</u> :  "Yo"}</p>
                                    <RadioButton 
                                        variant='1'
                                        checked={startsChecked[0]}
                                        setChecked={handleCheck2}
                                        index='0'
                                    />
                                </div>

                                <div className='item-list-rb'>
                                    <p style={{ color: '#41403E' }}>{ startsChecked[1] ? <u>PC</u> :  "PC"}</p>
                                    <RadioButton 
                                        variant='2'
                                        checked={startsChecked[1]}
                                        setChecked={handleCheck2}
                                        index='1'
                                    />
                                </div>

                                <div className='item-list-rb'>
                                    <p style={{ color: '#41403E' }}>{ startsChecked[2] ? <u>Aleatorio</u> :  "Aleatorio"}</p>
                                    <RadioButton 
                                        variant='3'
                                        checked={startsChecked[2]}
                                        setChecked={handleCheck2}
                                        index='2'
                                    />
                                </div>
                                
                            </div>


                            <br/>
                            <br/>


                            <Button color='red' style={{ padding: '5px 20px 5px 20px', margin: '0px 10px 0px 10px' }} onClick={handleRestore}>Restaruar valores predeterminados</Button>

        
                            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: '20px', }}>
                                
                                <Button color='blue' style={{ padding: '5px 20px 5px 20px', margin: '0px 10px 0px 10px' }} onClick={handleSaveSettings}>Guardar</Button>
                                <Button color='black' style={{ padding: '5px 20px 5px 20px', margin: '0px 10px 0px 10px' }} onClick={() => setShowModal(false)}>Cerrar</Button>   
        
                            </div>

                        </div>
                    </div>    
                </div>
            }

        </div>
    )
}

export default ChooseDifficulty;