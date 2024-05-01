import React from 'react'
import '../styles/Index.css'
import logo from '../assets/logo.mp4'
import Button from '../components/Button'
import { Link } from 'react-router-dom'
import packageJson from '../../package.json'

import statsImg from '../assets/stats.jpg'

const Index = () => {
    document.title = 'Gatito';
    window.scrollTo({
        top: 0,
        behavior: 'smooth' 
    });
    
    return (
        <div className='index-body'>
            <video className='logo-video' autoPlay muted playsInline>
                <source src={logo} type="video/mp4" />
            </video>

            <br/>
            <br/>
            <br/>
            
            <div className='buttons-menu'>

                
                <Link className='button-menu' to='/alone/choose'>
                    <Button color='red' className='button-menu'>
                        Jugar en solitario
                    </Button>
                </Link><br/>

                <Link className='button-menu' to='/local'>
                    <Button color='blue' className='button-menu'>
                        PVP local
                    </Button> 
                </Link><br/>

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

            <footer className='footer-index'>
                <p className='dev-p'><b>Created by <Link to='https://github.com/DiegoBarajas' target='_blank'><u>devsau</u></Link> </b></p>
                <p className='version-p'><b>Versión:</b> {packageJson.version}</p>
            </footer>
        </div>
    )
}

export default Index