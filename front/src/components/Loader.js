import React from 'react'
import '../styles/Loader.css'

const Loader = ({ children, textColor='black', spinnerColor='black' }) => {
    return (
        <div style={{ color: textColor }} className='loader-container'>
            <span class="loader" style={{  borderColor: spinnerColor }}></span>
            <p>{children}</p>
        </div>
    )
}

export default Loader