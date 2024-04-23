import React, { useState } from 'react'
import '../styles/Input.css'

const Input = ({ type='text', label, id, value }) => {

    const [ currentValue, setCurrentValue ] = useState(value);

    return (
        <div>
            <label htmlFor={id} className='label-input'>{label}</label>
            <input 
                id={id}
                className='input'
                type={type}
                value={currentValue}

                onChange={(e) => setCurrentValue(e.target.value)}
            />
        </div>
    )
}

export default Input