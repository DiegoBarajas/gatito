function minimax(board, isMaximizing, pc) {
  function evaluate(board) {
      for (let row of board) {
          if (row.filter(cell => cell === 'x').length === 3) {
              return 10;
          } else if (row.filter(cell => cell === 'o').length === 3) {
              return -10;
          }
      }
      for (let col = 0; col < 3; col++) {
          if (board[0][col] === board[1][col] && board[1][col] === board[2][col] && board[0][col] === 'x') {
              return 10;
          } else if (board[0][col] === board[1][col] && board[1][col] === board[2][col] && board[0][col] === 'o') {
              return -10;
          }
      }
      if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] === 'x') {
          return 10;
      } else if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] === 'o') {
          return -10;
      }
      if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] === 'x') {
          return 10;
      } else if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] === 'o') {
          return -10;
      }
      if (board.some(row => row.includes(''))) {
          return 0;
      }
      return 0; 
  }

  let score = evaluate(board);

  if (score === 10 || score === -10) {
      return score;
  }

  if (!board.some(row => row.includes(''))) {
      return 0;
  }

  if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
              if (board[i][j] === '') {
                  board[i][j] = pc;
                  let score = minimax([...board], false, pc);
                  board[i][j] = '';
                  bestScore = Math.max(score, bestScore);
              }
          }
      }
      return bestScore;
  } else {
      let bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
              if (board[i][j] === '') {
                  board[i][j] = pc === 'x' ? 'o' : 'x';
                  let score = minimax([...board], true, pc);
                  board[i][j] = '';
                  bestScore = Math.min(score, bestScore);
              }
          }
      }
      return bestScore;
  }
}

function findBestMove(board, pc) {
  let bestScore = -Infinity;
  let bestMove = null;
  for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
          if (board[i][j] === '') {
              board[i][j] = pc;
              let score = minimax([...board], false, pc);
              board[i][j] = '';
              if (score > bestScore) {
                  bestScore = score;
                  bestMove = [i, j];
              }
          }
      }
  }
  return bestMove;
}

export default findBestMove;
