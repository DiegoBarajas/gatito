import React from 'react';
import '../styles/RadioButton.css';

import radio1 from '../assets/radio1.jpg';
import radio2 from '../assets/radio2.jpg';
import radio3 from '../assets/radio3.jpg';
import radio4 from '../assets/radio4.jpg';

import radio1_a from '../assets/radio1_a.jpg';
import radio2_a from '../assets/radio2_a.jpg';
import radio3_a from '../assets/radio3_a.jpg';
import radio4_a from '../assets/radio4_a.jpg';

const RadioButton = ({ variant='1', checked=false, setChecked, index }) => {

    return (
        <div className='container-radio-btn' onClick={()=>setChecked(index)}>
            <input type='radio' className='hidden' />
            <img
                src={chooseVariant(checked, variant)}
                className='rb-img'
                alt='Radio button'
            />
        </div>
    );
};

export default RadioButton;

function chooseVariant(active, number){

    const inactiveArr = [ radio1, radio2, radio3, radio4 ]
    const activeArr = [radio1_a, radio2_a, radio3_a, radio4_a];

    if(active){
        return activeArr[parseInt(number)-1]
    }else{
        return inactiveArr[parseInt(number)-1]
    }
}
