import React, { useEffect, useRef } from 'react'
import '../styles/Message.css'

const Message = ({ children, onTransitionEnd }) => {
    const messageRef = useRef(null);

    useEffect(() => {
    
        const element = messageRef.current;
        element.addEventListener('animationend', onTransitionEnd);
    
        return () => {
          element.removeEventListener('animationend', onTransitionEnd);
        };
      }, []); 

    return (
        <div className='message-container' ref={messageRef} onClick={onTransitionEnd}>{children}</div>
    )
}

export default Message