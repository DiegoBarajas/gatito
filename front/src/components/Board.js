import React, { useEffect, useRef, useState } from 'react';
import '../styles/Board.css';
import Box from './Box';

import board1 from '../assets/board1.mp4';
import board2 from '../assets/board2.mp4';
import board3 from '../assets/board3.mp4';
import board4 from '../assets/board4.mp4';
import board5 from '../assets/board5.mp4';
import boardImg from '../assets/boardStatic.png';

import winLine1 from '../assets/winline1.mp4';
import winLine2 from '../assets/winline2.mp4';
import winLine3 from '../assets/winline3.mp4';
import winLine4 from '../assets/winline4.mp4';
import winLine5 from '../assets/winline5.mp4';
import winLine6 from '../assets/winline6.mp4';
import winLine7 from '../assets/winline7.mp4';
import winLine8 from '../assets/winline8.mp4';
import tieLine from '../assets/tie.mp4';

import winLine1Img from '../assets/winline1.png';
import winLine2Img from '../assets/winline2.png';
import winLine3Img from '../assets/winline3.png';
import winLine4Img from '../assets/winline4.png';
import winLine5Img from '../assets/winline5.png';
import winLine6Img from '../assets/winline6.png';
import winLine7Img from '../assets/winline7.png';
import winLine8Img from '../assets/winline8.png';
import tieLineImg from '../assets/tieLine.png';

const Board = ({ board, boardType, onSelectBox, turn, types, onEnded, canPlay, setCanPlay, onBoardWrited, winner=null, handleEndedWinLine }) => {

  const videoRef  = useRef(null);
  const [ videoSrc, setVideoSrc ] = useState(null);
  const [ winLine, setWinLine ] = useState(null);
  const [ winLineImg, setWinLineImg ] = useState(null);

  const [ usrCanPlay, setUsrCanPlay ] = useState(false)
  const [ error, setError ] = useState(false);
  const [ errorBoard, setErrorBoard ] = useState(false);

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
      case 0: 
        setWinLine(tieLine); 
        setWinLineImg(tieLineImg); 
        break;

      case 1: 
        setWinLine(winLine1); 
        setWinLineImg(winLine1Img); 
        break;

      case 2: 
        setWinLine(winLine2); 
        setWinLineImg(winLine2Img); 
        break;

      case 3: 
        setWinLine(winLine3); 
        setWinLineImg(winLine3Img); 
        break;

      case 4: 
        setWinLine(winLine4); 
        setWinLineImg(winLine4Img); 
        break;

      case 5: 
        setWinLine(winLine5); 
        setWinLineImg(winLine5Img); 
        break;

      case 6: 
        setWinLine(winLine6); 
        setWinLineImg(winLine6Img); 
        break;

      case 7: 
        setWinLine(winLine7); 
        setWinLineImg(winLine7Img); 
        break;

      case 8: 
        setWinLine(winLine8); 
        setWinLineImg(winLine8Img); 
        break;
      default: setWinLine(null); break;
    }
  }, [winner]);

  const handleEnded = () => {
    setUsrCanPlay(true);
    onBoardWrited();
  }

  const playMedia = () => {
    videoRef.current.play();
  }

  const onError = () => {
    setError(true);
  }

  return (
    <div className='board-body'>
        <div id='boardBackground' className='container-board'>
            {
              videoSrc === null 
                ? <></>
                : errorBoard
                    ? <img src={boardImg} alt='Board' onLoad={handleEnded} className='img-backgorund' />
                    : <video ref={videoRef} id='board' className='video-backgorund' muted playsInline onEnded={handleEnded} onError={() => setErrorBoard(true)} onAbort={() => setErrorBoard(true)} onStalled={() => setErrorBoard(true)} onCanPlay={playMedia} style={(usrCanPlay && canPlay) ? {} : { filter: 'opacity(60%)' }}> 
                          <source src={videoSrc} type="video/mp4" />
                          Cannot reproduce the media
                      </video>
            }
        </div>

        <div id='boardMain' className='container-board board'> 
            <Box type={ types[0] } value={ board[0][0] } onClick={() => onSelectBox(0, 0)} turn={turn} canPlay={(usrCanPlay && canPlay)} setCanPlay={setCanPlay} onEnded={onEnded} style={(usrCanPlay && canPlay) ? {} : { filter: 'opacity(60%)' }} />
            <Box type={ types[1] } value={ board[0][1] } onClick={() => onSelectBox(0, 1)} turn={turn} canPlay={(usrCanPlay && canPlay)} setCanPlay={setCanPlay} onEnded={onEnded} style={(usrCanPlay && canPlay) ? {} : { filter: 'opacity(60%)' }} />
            <Box type={ types[2] } value={ board[0][2] } onClick={() => onSelectBox(0, 2)} turn={turn} canPlay={(usrCanPlay && canPlay)} setCanPlay={setCanPlay} onEnded={onEnded} style={(usrCanPlay && canPlay) ? {} : { filter: 'opacity(60%)' }} />

            <Box type={ types[3] } value={ board[1][0] } onClick={() => onSelectBox(1, 0)} turn={turn} canPlay={(usrCanPlay && canPlay)} setCanPlay={setCanPlay} onEnded={onEnded} style={(usrCanPlay && canPlay) ? {} : { filter: 'opacity(60%)' }} />
            <Box type={ types[4] } value={ board[1][1] } onClick={() => onSelectBox(1, 1)} turn={turn} canPlay={(usrCanPlay && canPlay)} setCanPlay={setCanPlay} onEnded={onEnded} style={(usrCanPlay && canPlay) ? {} : { filter: 'opacity(60%)' }} />
            <Box type={ types[5] } value={ board[1][2] } onClick={() => onSelectBox(1, 2)} turn={turn} canPlay={(usrCanPlay && canPlay)} setCanPlay={setCanPlay} onEnded={onEnded} style={(usrCanPlay && canPlay) ? {} : { filter: 'opacity(60%)' }} />

            <Box type={ types[6] } value={ board[2][0] } onClick={() => onSelectBox(2, 0)} turn={turn} canPlay={(usrCanPlay && canPlay)} setCanPlay={setCanPlay} onEnded={onEnded} style={(usrCanPlay && canPlay) ? {} : { filter: 'opacity(60%)' }} />
            <Box type={ types[7] } value={ board[2][1] } onClick={() => onSelectBox(2, 1)} turn={turn} canPlay={(usrCanPlay && canPlay)} setCanPlay={setCanPlay} onEnded={onEnded} style={(usrCanPlay && canPlay) ? {} : { filter: 'opacity(60%)' }} />
            <Box type={ types[8] } value={ board[2][2] } onClick={() => onSelectBox(2, 2)} turn={turn} canPlay={(usrCanPlay && canPlay)} setCanPlay={setCanPlay} onEnded={onEnded} style={(usrCanPlay && canPlay) ? {} : { filter: 'opacity(60%)' }} />
        </div>

        {
          winLine === null
            ? <div className='container-board center abajoooo'>
                <div className='winline'>
                </div>
            </div>

            : error
              ? <div className='container-board center'>
                  <div className='winline'>
                    <img src={winLineImg} alt='' className='img-winline' onLoad={handleEndedWinLine} />
                  </div>
                </div>

              : <div className='container-board center'>
                  <div className='winline'>
                      <video autoPlay className='video-winline' muted playsInline onEnded={handleEndedWinLine} onError={onError}>
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
