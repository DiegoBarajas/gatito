
function pseudoRandom(board, player) {
    // Función para verificar si hay una jugada ganadora en el próximo turno
    function isNextMoveWinning(board, player) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === '') {
                    board[i][j] = player;
                    if (checkWinner(board, player)) {
                        board[i][j] = ''; // Deshacer la jugada
                        return [i, j];
                    }
                    board[i][j] = ''; // Deshacer la jugada
                }
            }
        }
        return null;
    }

    // Función para verificar si hay un ganador en el tablero actual
    function checkWinner(board, player) {
        const lines = [
            [[0, 0], [0, 1], [0, 2]], // Filas
            [[1, 0], [1, 1], [1, 2]],
            [[2, 0], [2, 1], [2, 2]],
            [[0, 0], [1, 0], [2, 0]], // Columnas
            [[0, 1], [1, 1], [2, 1]],
            [[0, 2], [1, 2], [2, 2]],
            [[0, 0], [1, 1], [2, 2]], // Diagonales
            [[0, 2], [1, 1], [2, 0]]
        ];

        for (const line of lines) {
            if (line.every(([i, j]) => board[i][j] === player)) {
                return true;
            }
        }
        return false;
    }

    // Función para verificar si el oponente puede ganar en el próximo turno
    function canOpponentWinNextTurn(board, player) {
        const opponent = player === 'x' ? 'o' : 'x';
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === '') {
                    board[i][j] = opponent;
                    if (checkWinner(board, opponent)) {
                        board[i][j] = ''; // Deshacer la jugada
                        return [i, j];
                    }
                    board[i][j] = ''; // Deshacer la jugada
                }
            }
        }
        return null;
    }

    // Verificar si el jugador puede ganar en el próximo turno
    const winningMove = isNextMoveWinning(board, player);
    if (winningMove) {
        return winningMove;
    }

    // Verificar si el oponente puede ganar en el próximo turno
    const blockingMove = canOpponentWinNextTurn(board, player);
    if (blockingMove) {
        return blockingMove;
    }

    // Generar una jugada aleatoria
    const availableMoves = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                availableMoves.push([i, j]);
            }
        }
    }

    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    return availableMoves[randomIndex];
}

export default pseudoRandom;