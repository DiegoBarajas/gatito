function minimax(tablero, jugador) {
    // Si el tablero está lleno o alguien ha ganado, se devuelve el valor correspondiente
    if (esFinal(tablero) !== -1) {
      return valorTablero(tablero, jugador);
    }
  
    // Inicializar el mejor movimiento y su valor
    let mejorMovimiento = { valor: -Infinity };
  
    // Recorrer todas las casillas vacías
    for (let fila = 0; fila < 3; fila++) {
      for (let columna = 0; columna < 3; columna++) {
        if (tablero[fila][columna] === '') {
          // Simular el movimiento del jugador actual
          tablero[fila][columna] = jugador;
  
          // Obtener el valor minimax del siguiente movimiento del oponente
          let valor = -minimax(tablero, jugador === 'x' ? 'o' : 'x');
  
          // Deshacer el movimiento simulado
          tablero[fila][columna] = '';
  
          // Actualizar el mejor movimiento si el valor actual es mejor
          if (valor > mejorMovimiento.valor) {
            mejorMovimiento = { fila, columna, valor };
          }
        }
      }
    }
  
    // Devolver el valor del mejor movimiento
    return mejorMovimiento.valor;
  }
  
  // Función para evaluar el estado del tablero
  function esFinal(tablero) {
    // Comprobar si hay una fila completa
    for (let fila = 0; fila < 3; fila++) {
      if (tablero[fila][0] === tablero[fila][1] && tablero[fila][1] === tablero[fila][2] && tablero[fila][0] !== '') {
        return tablero[fila][0];
      }
    }
  
    // Comprobar si hay una columna completa
    for (let columna = 0; columna < 3; columna++) {
      if (tablero[0][columna] === tablero[1][columna] && tablero[1][columna] === tablero[2][columna] && tablero[0][columna] !== '') {
        return tablero[0][columna];
      }
    }
  
    // Comprobar diagonales
    if (tablero[0][0] === tablero[1][1] && tablero[1][1] === tablero[2][2] && tablero[0][0] !== '') {
      return tablero[0][0];
    }
    if (tablero[0][2] === tablero[1][1] && tablero[1][1] === tablero[2][0] && tablero[0][2] !== '') {
      return tablero[0][2];
    }
  
    // Comprobar si hay casillas vacías
    for (let fila = 0; fila < 3; fila++) {
      for (let columna = 0; columna < 3; columna++) {
        if (tablero[fila][columna] === '') {
          return -1; // El juego no ha terminado
        }
      }
    }
  
    // Tablero lleno y nadie ha ganado
    return 0;
  }
  
  // Función para asignar un valor al tablero según el jugador
  function valorTablero(tablero, jugador) {
    if (esFinal(tablero) === jugador) {
      return 1;
    } else if (esFinal(tablero) === (jugador === 'x' ? 'o' : 'x')) {
      return -1;
    } else {
      return 0;
    }
  }
  
  // Función para encontrar la mejor jugada
  function mejorJugada(tablero, jugador) {
    // Implementar la función minimax con poda alfa-beta para encontrar la mejor jugada
    let movimientos = [];
    let mejorMovimiento = { valor: jugador === 'x' ? -Infinity : Infinity };
    let alfa = -Infinity;
    let beta = Infinity;
  
    for (let fila = 0; fila < 3; fila++) {
      for (let columna = 0; columna < 3; columna++) {
        if (tablero[fila][columna] === '') {
          tablero[fila][columna] = jugador;
          let valor = minimax(tablero, jugador === 'x' ? 'o' : 'x', alfa, beta);
          tablero[fila][columna] = '';
  
          if ((jugador === 'x' && valor > mejorMovimiento.valor) || (jugador === 'o' && valor < mejorMovimiento.valor)) {
            mejorMovimiento = { fila, columna, valor };
            movimientos = [{ fila, columna, valor }];
          } else if (valor === mejorMovimiento.valor) {
            movimientos.push({ fila, columna, valor });
          }
        }
      }
    }
  
    // Si hay varios movimientos con el mismo valor, elige uno aleatoriamente
    if (movimientos.length > 1) {
      mejorMovimiento = movimientos[Math.floor(Math.random() * movimientos.length)];
    }
  
    return [ mejorMovimiento.fila, mejorMovimiento.columna ]
  }
  
export default mejorJugada;