import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import '../styles/PageNotFound.css'

import pnfImg from '../assets/pageNotFound.png'

const PageNotFound = () => {

    document.title = 'Gatito - Página no encontrada'


    return (
        <div className='pnf-body'>

            <div className='pnf-container'>
                <img src={pnfImg} alt='Pagina No encontrada' className='pnf-img'/>
                <h1 className='h1-pnf'>Página no encontrada (Error 404)</h1>
                <p className='p-pnf'>Lo sentimos, no se encontró la página</p>
                <br/>
                <br/>

                <Link to='/' className='back-home'>
                    <Button>Volver al inicio</Button>
                </Link>
            </div>

        </div>
    )
}

export default PageNotFound