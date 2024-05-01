function minimax(tablero, player, opponent) {
    if (esGanador(tablero, player)) {
      return 1;
    } else if (esGanador(tablero, opponent)) {
      return -1;
    } else if (esEmpate(tablero)) {
      return 0;
    }
  
    let mejorValor = -Infinity;
    let mejorMovimiento = null;
    for (let i = 0; i < tablero.length; i++) {
      if (tablero[i] === "") {
        tablero[i] = player;
        let valor = -minimax(tablero, opponent, player);
        tablero[i] = "";
  
        if (valor > mejorValor) {
          mejorValor = valor;
          mejorMovimiento = i;
        }
      }
    }
    return mejorValor;
  }
  
  function esGanador(tablero, player) {
    for (let i = 0; i < 3; i++) {
      if (tablero[i*3] === player && tablero[i*3 + 1] === player && tablero[i*3 + 2] === player) {
        return true;
      }
    }
  
    for (let i = 0; i < 3; i++) {
      if (tablero[i] === player && tablero[i + 3] === player && tablero[i + 6] === player) {
        return true;
      }
    }
  
    if (tablero[0] === player && tablero[4] === player && tablero[8] === player) {
      return true;
    }
    if (tablero[2] === player && tablero[4] === player && tablero[6] === player) {
      return true;
    }
  
    return false;
  }
  
  function esEmpate(tablero) {
    for (let i = 0; i < tablero.length; i++) {
      if (tablero[i] === "") {
        return false;
      }
    }
    return true;
  }
  
  function mejorJugada(tablero, player, opponent) {
    let mejorMovimiento = null;
    let mejorValor = -Infinity;
    for (let i = 0; i < tablero.length; i++) {
      if (tablero[i] === "") {
        tablero[i] = player;
        let valor = -minimax(tablero, opponent, player);
        tablero[i] = "";
        if (valor > mejorValor) {
          mejorValor = valor;
          mejorMovimiento = i;
        }
      }
    }
    return mejorMovimiento;
  }

  
function getBestPlay(board, player){
    const tablero = [board[0][0], board[0][1], board[0][2], board[1][0], board[1][1], board[1][2], board[2][0], board[2][1], board[2][2]]

    const opponent = player === 'x' ? 'o' : 'x';
    const indx = mejorJugada(tablero, player, opponent);

    return [ Math.floor(indx / 3), indx % 3  ]
}

module.exports = getBestPlay;