function random(board){
    const auxBoard = [];

    for(let i=0 ; i<3 ; i++){
        for(let j=0; j<3 ; j++){
            auxBoard.push( board[i][j] );
        }
    }

    let index = null;
    do{
        index = Math.floor(Math.random() * 9); 
    }while(auxBoard[index] !== '');

    const [row, col] =  [ (Math.floor(index / 3)), (index % 3) ];
    return [row, col];
}

export default random;