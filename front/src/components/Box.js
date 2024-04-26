import React, { useEffect, useRef, useState } from 'react'
import circle1 from '../assets/circle1.mp4';
import circle2 from '../assets/circle2.mp4';
import circle3 from '../assets/circle3.mp4';
import circle4 from '../assets/circle4.mp4';
import circle5 from '../assets/circle5.mp4';
import circleImg from '../assets/o.png';

import equis1 from '../assets/equis1.mp4';
import equis2 from '../assets/equis2.mp4';
import equis3 from '../assets/equis3.mp4';
import equis4 from '../assets/equis4.mp4';
import equis5 from '../assets/equis5.mp4';
import equisImg from '../assets/x.png';

const Box = ({ value='', type=1, onClick, turn='x', canPlay, setCanPlay, onEnded }) => {
    
    const videoRef  = useRef(null);

    const [ srcO, setSrcO ] = useState(null);
    const [ srcX, setSrcX ] = useState(null);
    const [ error, setError ] = useState(false);

    useEffect(() => {
        switch(type){
            case 1:
                setSrcO( circle1 );
                setSrcX( equis1 );
                break;

            case 2:
                setSrcO( circle2 );
                setSrcX( equis2 );
                break;

            case 3:
                setSrcO( circle3 );
                setSrcX( equis3 );
                break;
                
            case 4:
                setSrcO( circle4 );
                setSrcX( equis4 );
                break;
            case 5:
                setSrcO( circle5 );
                setSrcX( equis5 );
                break;
                
            default:
                setSrcO( circle1 );
                setSrcX( equis1 );
                break;
        }
    }, []);

    const handleError = (event) => {
        setError(true);
    };
    
    const playMedia = () => {
        videoRef.current.play();
    }

    return value !== ''
        ? <div className='box'>
                {
                    error
                        ? <img className='image-emergency' src={ value === 'x' ? equisImg : circleImg } alt={value} onLoad={onEnded}/>
                        : value === 'o'
                            ? <video ref={videoRef} className='box-video' muted playsInline onEnded={onEnded} onPlay={() => setCanPlay(false)} onError={handleError} onCanPlay={playMedia}>
                                    <source src={srcO} type="video/mp4" />
                                </video>
                            : <video ref={videoRef} className='box-video' muted playsInline onEnded={onEnded} onPlay={() => setCanPlay(false)} onError={handleError} onCanPlay={playMedia}>
                                <source src={srcX} type="video/mp4" />
                            </video>
                }
        </div>
            
        : <div className={canPlay ? `box-inactive box-inactive-${turn}` : 'box-inactive-cant'} onClick={canPlay ? onClick : () => {}}> </div>
}

export default Box