import React from 'react'
import '../styles/Switch.css'
import switchOnImg from '../assets/switch-on.png'
import switchOffImg from '../assets/switch-off.png'


const Switch = ({isOn=false, setIsOn, children}) => {
    return (
        <div className='switch' onClick={setIsOn}>
            <p className='p-switch'>{children}</p>
            <img alt="No cargo el recurso, favor de recargar la página" src={isOn ? switchOnImg : switchOffImg} className='switch-img'/>
        </div>
    )
}

export default Switch