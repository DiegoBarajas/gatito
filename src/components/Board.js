import React from 'react'
import '../styles/Board.css'
import Box from './Box'

const Board = ({ board, onSelectBox }) => {
    return (
        <div className='board'>
            
            <Box value={ board[0][0] } onClick={() => onSelectBox(0, 0)} />
            <Box value={ board[0][1] } onClick={() => onSelectBox(0, 1)} />
            <Box value={ board[0][2] } onClick={() => onSelectBox(0, 2)} />

            <Box value={ board[1][0] } onClick={() => onSelectBox(1, 0)} />
            <Box value={ board[1][1] } onClick={() => onSelectBox(1, 1)} />
            <Box value={ board[1][2] } onClick={() => onSelectBox(1, 2)} />

            <Box value={ board[2][0] } onClick={() => onSelectBox(2, 0)} />
            <Box value={ board[2][1] } onClick={() => onSelectBox(2, 1)} />
            <Box value={ board[2][2] } onClick={() => onSelectBox(2, 2)} />


        </div>
    )
}

export default Board