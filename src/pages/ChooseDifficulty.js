import React from 'react'
import '../styles/ChooseDifficulty.css'
import Button from '../components/Button'
import { Link } from 'react-router-dom'

import easyImg from '../assets/easy.png'
import midImg from '../assets/mid.png'
import hardImg from '../assets/hard.png'


const ChooseDifficulty = () => {
    return (
        <div className='choose-body'>
            <Link className='link-game-back' to='/'> Volver Atras </Link>
            <br/>

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
        </div>
    )
}

export default ChooseDifficulty