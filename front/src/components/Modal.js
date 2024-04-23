import React from 'react'
import '../styles/Modal.css'
import Button from './Button'

const Modal = ({ visible=false, title='', body='', acceptText='Aceptar', cancelText='', onAccept, onCancel }) => {
    return !visible ? <></>
    : (
        <div className='modal-body'>
            <div className="hoja">
                <div className='content-hoja'>
                    <h2>{title}</h2>
                    <p>{body}</p>

                    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: '20px', }}>
                        <Button color='blue' style={{ padding: '5px 20px 5px 20px', margin: '0px 10px 0px 10px' }} onClick={onAccept}>{acceptText}</Button>
                        {
                            cancelText === '' ? <></> : <Button color='red' style={{ padding: '5px 20px 5px 20px', margin: '0px 10px 0px 10px' }} onClick={onCancel}>{cancelText}</Button>
                        }

                    </div>
                </div>
            </div>    
        </div>
    )
}

export default Modal