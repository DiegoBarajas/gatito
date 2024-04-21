import React from 'react'
import oImg from '../assets/o.png'
import xImg from '../assets/x.png'

const Box = ({ value='', onClick }) => {
    return value !== ''
        ? <div className='box'>
                {
                    value === 'o'
                        ? <img className='box-img' src={ oImg } alt='O'/>
                        : <img className='box-img' src={ xImg } alt='X'/>
                }
        </div>
            
        : <div className='box-inactive' onClick={onClick}> </div>
}

export default Box