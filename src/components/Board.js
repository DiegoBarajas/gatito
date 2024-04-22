import React, { useEffect, useState } from 'react';
import '../styles/Board.css';
import Box from './Box';
import board1 from '../assets/board1.mp4';
import board2 from '../assets/board2.mp4';
import board3 from '../assets/board3.mp4';
import board4 from '../assets/board4.mp4';
import board5 from '../assets/board5.mp4';

const Board = ({ board, boardType, onSelectBox, turn, types, playerCanPlay=true }) => {
  const [ marginLeft, setMarginLeft ] = useState('0px');
  const [ canPlay, setCanPlay ] = useState(false);
  const [ videoSrc, setVideoSrc ] = useState(null);

  useEffect(() => {
    
    switch (boardType){
      case 1: setVideoSrc(board1); break;
      case 2: setVideoSrc(board2); break;
      case 3: setVideoSrc(board3); break;
      case 4: setVideoSrc(board4); break;
      case 5: setVideoSrc(board5); break;
      default: setVideoSrc(board1); break;
    }    
    
    const centerElement = (id) => {
      const element = document.getElementById(id);
      const elementWidth = parseInt(window.getComputedStyle(element).width, 10);
      const screenWidth = window.innerWidth;
      
      const margin = ((screenWidth - elementWidth) / 2) + 'px';
      return margin;
    };
    
    window.addEventListener('resize', () => centerElement('boardBackground'));
    setMarginLeft(centerElement('boardBackground'));
  }, [boardType]);

  const handleEnded = () => {
    setCanPlay(true);
  }


  return (
    <div className='board-body'>
        <div id='boardBackground' className='container-board' style={{ marginLeft }}>
            {
              videoSrc === null 
                ? <></>
                : <video id='board' className='video-backgorund' autoPlay muted playsInline onEnded={handleEnded}>
                      <source src={videoSrc} type="video/mp4" />
                  </video>
            }
        </div>

        <div id='boardMain' className='container-board board'> 
            <Box type={ types[0] } value={ board[0][0] } onClick={() => onSelectBox(0, 0)} turn={turn} canPlay={canPlay && playerCanPlay} setCanPlay={setCanPlay} />
            <Box type={ types[1] } value={ board[0][1] } onClick={() => onSelectBox(0, 1)} turn={turn} canPlay={canPlay && playerCanPlay} setCanPlay={setCanPlay} />
            <Box type={ types[2] } value={ board[0][2] } onClick={() => onSelectBox(0, 2)} turn={turn} canPlay={canPlay && playerCanPlay} setCanPlay={setCanPlay} />

            <Box type={ types[3] } value={ board[1][0] } onClick={() => onSelectBox(1, 0)} turn={turn} canPlay={canPlay && playerCanPlay} setCanPlay={setCanPlay} />
            <Box type={ types[4] } value={ board[1][1] } onClick={() => onSelectBox(1, 1)} turn={turn} canPlay={canPlay && playerCanPlay} setCanPlay={setCanPlay} />
            <Box type={ types[5] } value={ board[1][2] } onClick={() => onSelectBox(1, 2)} turn={turn} canPlay={canPlay && playerCanPlay} setCanPlay={setCanPlay} />

            <Box type={ types[6] } value={ board[2][0] } onClick={() => onSelectBox(2, 0)} turn={turn} canPlay={canPlay && playerCanPlay} setCanPlay={setCanPlay} />
            <Box type={ types[7] } value={ board[2][1] } onClick={() => onSelectBox(2, 1)} turn={turn} canPlay={canPlay && playerCanPlay} setCanPlay={setCanPlay} />
            <Box type={ types[8] } value={ board[2][2] } onClick={() => onSelectBox(2, 2)} turn={turn} canPlay={canPlay && playerCanPlay} setCanPlay={setCanPlay} />
        </div>
    </div>
  );
};

export default Board;
