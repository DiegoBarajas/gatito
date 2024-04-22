function minimax(tablero, jugador) {
    const jugadores = { 'x': -1, 'o': 1 };
  
    function terminado(tablero) {
      for (let i = 0; i < 3; i++) {
        if (tablero[i][0] && tablero[i][0] === tablero[i][1] && tablero[i][0] === tablero[i][2]) {
          return jugadores[tablero[i][0]];
        }
      }
      for (let j = 0; j < 3; j++) {
        if (tablero[0][j] && tablero[0][j] === tablero[1][j] && tablero[0][j] === tablero[2][j]) {
          return jugadores[tablero[0][j]];
        }
      }
      if (tablero[0][0] && tablero[0][0] === tablero[1][1] && tablero[0][0] === tablero[2][2]) {
        return jugadores[tablero[0][0]];
      }
      if (tablero[0][2] && tablero[0][2] === tablero[1][1] && tablero[0][2] === tablero[2][0]) {
        return jugadores[tablero[0][2]];
      }
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (tablero[i][j] === '') {
            return null;
          }
        }
      }
      return 0;
    }
  
    function minimaxRecursivo(tablero, jugador, alpha, beta) {
      let resultado = terminado(tablero);
      if (resultado !== null) {
        return resultado;
      }
  
      if (jugador === 'o') { // Maximizar
        let mejorPuntuacion = -Infinity;
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (tablero[i][j] === '') {
              tablero[i][j] = jugador;
              let puntuacion = minimaxRecursivo(tablero, 'x', alpha, beta);
              tablero[i][j] = '';
              mejorPuntuacion = Math.max(mejorPuntuacion, puntuacion);
              alpha = Math.max(alpha, mejorPuntuacion);
              if (beta <= alpha) {
                break;
              }
            }
          }
        }
        return mejorPuntuacion;
      } else {
        let mejorPuntuacion = Infinity;
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (tablero[i][j] === '') {
              tablero[i][j] = jugador;
              let puntuacion = minimaxRecursivo(tablero, 'o', alpha, beta);
              tablero[i][j] = '';
              mejorPuntuacion = Math.min(mejorPuntuacion, puntuacion);
              beta = Math.min(beta, mejorPuntuacion);
              if (beta <= alpha) {
                break;
              }
            }
          }
        }
        return mejorPuntuacion;
      }
    }
  
    let mejorPuntuacion = -Infinity;
    let mejorJugada = null;
    let alpha = -Infinity;
    let beta = Infinity;
  
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (tablero[i][j] === '') {
          tablero[i][j] = jugador;
          let puntuacion = minimaxRecursivo(tablero, jugador === 'x' ? 'o' : 'x', alpha, beta);
          tablero[i][j] = '';
          if (puntuacion > mejorPuntuacion) {
            mejorPuntuacion = puntuacion;
            mejorJugada = [i, j];
          }
        }
      }
    }
  
    return mejorJugada;
}
  
  
export default minimax;