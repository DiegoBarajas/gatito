import React, { useEffect, useState } from 'react'
import '../styles/Index.css'
import logo from '../assets/logo.mp4'
import Button from '../components/Button'
import { Link } from 'react-router-dom'
import packageJson from '../../package.json'
import Message from '../components/Message'

import statsImg from '../assets/stats.jpg'
import settingsImg from '../assets/settings.jpg'
import Switch from '../components/Switch'

const Index = () => {

    document.title = 'Gatito';
    window.scrollTo({
        top: 0,
        behavior: 'smooth' 
    });
    const settings = JSON.parse(localStorage.getItem('global-config'));
    
    const [browser, setBrowser] = useState('');

    const [ showModal, setShowModal ] = useState(false);
    const [ switchOn, setSwitchOn ] = useState(settings === null ? true : settings.animations);
    const [ message, setMessage ] = useState(null);

    useEffect(() => {

        if(settings === null){
            const sett = {
                animations: true
            }
            
            localStorage.setItem('global-config', JSON.stringify(sett));
        }

    }, [1]);

    const changeSwitch = () => {
        setSwitchOn(!switchOn);
    }

    const handleSaveSettings = () => {
        const sett = {
            animations: switchOn
        }

        localStorage.setItem('global-config', JSON.stringify(sett));
        setShowModal(false);
        setMessage('Configuración actualizada');
    }

    const handleCloseSettings = () => {
        const settings = JSON.parse(localStorage.getItem('global-config'));
        
        setShowModal(false);
        setSwitchOn(settings === null ? true : settings.animations);
    }
    
    return (
        <div className='index-body'>
            <video className='logo-video' autoPlay muted playsInline>
                <source src={logo} type="video/mp4" />
            </video>

            <br/>
            <br/>
            <br/>
            
            <div className='buttons-menu'>

                
                <Link className='button-menu' to='/alone/choose' style={{ marginBottom: '20px' }}>
                    <Button color='red' className='button-menu'>
                        Jugar en solitario
                    </Button>
                </Link>

                <Link className='button-menu' to='/local' style={{ marginBottom: '20px' }}>
                    <Button color='blue' className='button-menu'>
                        PVP local
                    </Button> 
                </Link>

                <Link className='button-menu' to='/connect'>
                    <Button className='button-menu'>
                        PVP en linea
                    </Button>
                </Link>

            </div>

            <Link to='stats'>
                <Button className='button-stats'>
                    <img src={statsImg} alt='Stats' />
                </Button>
            </Link>

            <Button className='button-settings' onClick={() => setShowModal(true)}>
                <img src={settingsImg} alt='Stats' />
            </Button>

            <footer className='footer-index'>
                <p className='dev-p'><b>Created by <Link to='https://github.com/DiegoBarajas' target='_blank'><u>devsau</u></Link> </b></p>
                <p className='version-p'><b>Versión:</b> {packageJson.version}</p>
            </footer>


            {
                !showModal ? <></>
                : <div className='modal-body' style={{ overflowY: 'hidden', width: 'max-content', minWidth: '100vw', minHeight: '100vh', height: '100%' }}>
                    <div className="hoja" style={{ height: '55%', maxHeight: '65%', overflowY: 'auto'}}>
                        <div className='content-hoja'>
                            <h2 style={{ marginBottom: 70 }}>Configuración</h2>
                            
                            <Switch
                                isOn={switchOn}
                                setIsOn={changeSwitch}
                            >Animaciones</Switch>
                            <p style={{ fontSize: 15 }}><b>Info: </b>Esta opcion desactiva las animaciones en partida, como al dibujar el tablero o los iconos.</p>
                            
        
                            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: '70px', }}>
                                
                                <Button color='blue' style={{ padding: '5px 20px 5px 20px', margin: '0px 10px 0px 10px' }} onClick={handleSaveSettings}>Guardar</Button>
                                <Button color='black' style={{ padding: '5px 20px 5px 20px', margin: '0px 10px 0px 10px' }} onClick={handleCloseSettings}>Cerrar</Button>   
        
                            </div>

                        </div>
                    </div>    
                </div>
            }

            { message === null ? <></> : <Message onTransitionEnd={() => setMessage(null)}>{message}</Message> }

        </div>
    )
}

export default Index