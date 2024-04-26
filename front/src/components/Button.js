import React from 'react';
import '../styles/Button.css';

const Boton = ({ children, color='black', style={}, className='', onClick, disabled=false }) => {
  return disabled 
    ? (
        <button className={`button-disabled button-${color} ${className}`} style={style}>
            { children }
        </button> 
    )
    :(
        <button className={`button button-${color} ${className}`} style={style} onClick={onClick}>
            { children }
        </button> 
    );
}

export default Boton;
