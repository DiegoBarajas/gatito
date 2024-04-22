import React from 'react';
import '../styles/Button.css';

const Boton = ({ children, color='black', style={}, className='', onClick }) => {
  return (
        <button className={`button button-${color} ${className}`} style={style} onClick={onClick}>
            { children }
        </button> 
    );
}

export default Boton;
