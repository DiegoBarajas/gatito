import React, { useEffect, useRef, useState } from 'react';
import '../styles/Board.css';
import Box from './Box';

import board1 from '../assets/board1.mp4';
import board2 from '../assets/board2.mp4';
import board3 from '../assets/board3.mp4';
import board4 from '../assets/board4.mp4';
import board5 from '../assets/board5.mp4';

import winLine1 from '../assets/winline1.mp4';
import winLine2 from '../assets/winline2.mp4';
import winLine3 from '../assets/winline3.mp4';
import winLine4 from '../assets/winline4.mp4';
import winLine5 from '../assets/winline5.mp4';
import winLine6 from '../assets/winline6.mp4';
import winLine7 from '../assets/winline7.mp4';
import winLine8 from '../assets/winline8.mp4';
import tieLine from '../assets/tie.mp4';

const Board = ({ board, boardType, onSelectBox, turn, types, onEnded, canPlay, setCanPlay, settings=null, winner=null, handleEndedWinLine }) => {

  const videoRef  = useRef(null);
  const [ videoSrc, setVideoSrc ] = useState(null);
  const [ winLine, setWinLine ] = useState(null);

  const [ usrCanPlay, setUsrCanPlay ] = useState(false)

  useEffect(() => {
    
    switch (boardType){
      case 1: setVideoSrc(board1); break;
      case 2: setVideoSrc(board2); break;
      case 3: setVideoSrc(board3); break;
      case 4: setVideoSrc(board4); break;
      case 5: setVideoSrc(board5); break;
      default: setVideoSrc(board1); break;
    }
    
  }, [boardType]);

  useEffect(() => {    
    switch (winner){
      case 0: setWinLine(tieLine); break;
      case 1: setWinLine(winLine1); break;
      case 2: setWinLine(winLine2); break;
      case 3: setWinLine(winLine3); break;
      case 4: setWinLine(winLine4); break;
      case 5: setWinLine(winLine5); break;
      case 6: setWinLine(winLine6); break;
      case 7: setWinLine(winLine7); break;
      case 8: setWinLine(winLine8); break;
      default: setWinLine(null); break;
    }
  }, [winner]);

  const handleEnded = () => {
    setUsrCanPlay(true);
    
    if(settings === null){
      setCanPlay(true);
      return;
    }else if(turn === settings.player){
      setCanPlay(true);
    }
  }

  const playMedia = () => {
    videoRef.current.play();
  }

  return (
    <div className='board-body'>
        <div id='boardBackground' className='container-board'>
            {
              videoSrc === null 
                ? <></>
                : <video ref={videoRef} id='board' className='video-backgorund' muted playsInline onEnded={handleEnded} onCanPlay={playMedia}>
                      <source src={videoSrc} type="video/mp4" />
                      Cannot reproduce the media
                  </video>
            }
        </div>

        <div id='boardMain' className='container-board board'> 
            <Box type={ types[0] } value={ board[0][0] } onClick={() => onSelectBox(0, 0)} turn={turn} canPlay={usrCanPlay && canPlay} setCanPlay={setCanPlay} onEnded={onEnded} />
            <Box type={ types[1] } value={ board[0][1] } onClick={() => onSelectBox(0, 1)} turn={turn} canPlay={usrCanPlay && canPlay} setCanPlay={setCanPlay} onEnded={onEnded} />
            <Box type={ types[2] } value={ board[0][2] } onClick={() => onSelectBox(0, 2)} turn={turn} canPlay={usrCanPlay && canPlay} setCanPlay={setCanPlay} onEnded={onEnded} />

            <Box type={ types[3] } value={ board[1][0] } onClick={() => onSelectBox(1, 0)} turn={turn} canPlay={usrCanPlay && canPlay} setCanPlay={setCanPlay} onEnded={onEnded} />
            <Box type={ types[4] } value={ board[1][1] } onClick={() => onSelectBox(1, 1)} turn={turn} canPlay={usrCanPlay && canPlay} setCanPlay={setCanPlay} onEnded={onEnded} />
            <Box type={ types[5] } value={ board[1][2] } onClick={() => onSelectBox(1, 2)} turn={turn} canPlay={usrCanPlay && canPlay} setCanPlay={setCanPlay} onEnded={onEnded} />

            <Box type={ types[6] } value={ board[2][0] } onClick={() => onSelectBox(2, 0)} turn={turn} canPlay={usrCanPlay && canPlay} setCanPlay={setCanPlay} onEnded={onEnded} />
            <Box type={ types[7] } value={ board[2][1] } onClick={() => onSelectBox(2, 1)} turn={turn} canPlay={usrCanPlay && canPlay} setCanPlay={setCanPlay} onEnded={onEnded} />
            <Box type={ types[8] } value={ board[2][2] } onClick={() => onSelectBox(2, 2)} turn={turn} canPlay={usrCanPlay && canPlay} setCanPlay={setCanPlay} onEnded={onEnded} />
        </div>

        {
          winLine === null
            ? <div className='container-board center abajoooo'>
                <div className='winline'>
                </div>
            </div>

            : <div className='container-board center'>
                <div className='winline'>
                    <video autoPlay className='video-winline' muted playsInline onEnded={handleEndedWinLine} onError={handleEndedWinLine}>
                      <source src={winLine} type="video/mp4" />
                          Cannot reproduce the media
                    </video>
                </div>
            </div>
        }
    </div>
  );
};

export default Board;
