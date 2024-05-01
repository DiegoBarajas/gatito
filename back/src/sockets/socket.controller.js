const fs = require('fs');
const path = require('path');

const socketController = (io, socket) => {
    const controller = {};

    controller.createRoom = () => {
        const dir = path.resolve('./src/rooms');
        const exists = fs.existsSync(dir);
        
        if(!exists){
            fs.mkdirSync(dir);
        }

        do{
            var gameCode = generateGameCode();
            var jsonPath = path.resolve(dir, gameCode+'.json');
        }while(fs.existsSync(jsonPath));

        const settings = {
            player1: {
                id: socket.id,
                name: "Jugador 1",
                icon: 'x'
            },
            player2: {
                id: null,
                name: "Jugador 2",
                icon: 'o'
            },
            host: socket.id,
            starts: 'host'
        }

        socket.join(gameCode);
        fs.writeFileSync(jsonPath, JSON.stringify(settings));
        fs.chmodSync(jsonPath, 0o777);

        socket.emit('server:createRoom', {
            settings,
            gameCode
        });
    }

    controller.joinRoom = (code) => {
        const jsonPath = path.resolve('./src/rooms', code+'.json' );

        if(fs.existsSync(jsonPath)){

            const actualConfig = require(jsonPath);

            if(actualConfig.player1.id === null){
                actualConfig.player1.id = socket.id;
                io.to(code).emit('server:sendMessage', actualConfig.player1.name + " se ha unido a la partida");
            } else if(actualConfig.player2.id === null){
                actualConfig.player2.id = socket.id;
                io.to(code).emit('server:sendMessage', actualConfig.player2.name + " se ha unido a la partida");
            }else return socket.emit('server:cannotConnect', {
                    title: "La sala esta llena",
                    body: "La sala a la que intentas ingresar esta llena, verifica que el host no este jugando con otra persona, si no es asi intente crear una nueva sala."
                });

            fs.writeFileSync(jsonPath, JSON.stringify(actualConfig));
            fs.chmodSync(jsonPath, 0o777);

            socket.join(code);
            
            io.to(code).emit('server:updateConfig', getConfig(actualConfig, socket.id));
            socket.emit('server:roomJoined', code);

        }else{
            socket.emit('server:cannotConnect', {
                title: "Codigo de juego incorrecto o invalido",
                body: "Verifica que el codigo sea correcto y que la sala siga activa."
            })
        }

    }

    controller.canBeHere = (gameCode) => {
        const dir = path.resolve('./src/rooms');
        
        if(!fs.existsSync(dir)){
            socket.emit('server:canBeHere', {
                title: 'Codigo inválido',
                body: 'El codigo ingresado es incorrecto o ha expirado, verifica que sea correcto e intente nuevamente'
            });
        }else{
            const jsonPath = dir+'/'+gameCode+".json"

            if(fs.existsSync(jsonPath)){
                const json = require(jsonPath);

                if( (json.player1.id == socket.id) || (json.player2.id == socket.id) ){
                    socket.join(gameCode);

                    socket.emit('server:canBeHere', true);
                    socket.emit('server:roomConfig', json);
                }else if( (json.player1.id != null) && (json.player2.id != null) ){
                    socket.emit('server:canBeHere', {
                        title: 'La sala esta llena',
                        body: 'La sala a la que intentas ingresar esta llena, verifica que el host no este jugando con otra persona, si no es asi intente crear una nueva sala.'
                    });
                }else {
                    if(json.player1.id === null) json.player1.id = socket.id;
                    else if(json.player2.id === null) json.player2.id = socket.id;

                    fs.writeFileSync(jsonPath, JSON.stringify(json));
                    fs.chmodSync(jsonPath, 0o777);

                    socket.join(gameCode);
                    
                    io.to(gameCode).emit('server:updateConfig', getConfig(json, socket.id));

                    socket.emit('server:canBeHere', true);
                    socket.emit('server:roomConfig', json);
                }

            }else socket.emit('server:canBeHere', {
                title: 'Codigo inválido',
                body: 'El codigo ingresado es incorrecto o ha expirado, verifica que sea correcto e intente nuevamente'
            });
        }
    }

    controller.getConfig = (gameCode) => {
        const dir = path.resolve('./src/rooms');
        const jsonPath = dir+'/'+gameCode+'.json';
        
        if(fs.existsSync(jsonPath)){
            const json = require(jsonPath);

            socket.emit('server:updateConfig', getConfig(json, socket.id));
        }
    }

    controller.leaveRoom = (gameCode) => {
        const dir = path.resolve('./src/rooms');
        const jsonPath = dir+'/'+gameCode+'.json';

        socket.leave(gameCode);

        if(fs.existsSync(jsonPath)){
            const json = require(jsonPath);
    
            if(json.player1.id === socket.id){
                if(json.host === socket.id) json.host = json.player2.id;
                json.player1.id = null;
                if(json.game != undefined) delete json.game

                io.to(gameCode).emit('server:sendMessage', json.player1.name + " ha abandonado la partida");
            }else if(json.player2.id === socket.id){
                if(json.host === socket.id) json.host = json.player1.id;
                json.player2.id = null;
                if(json.game != undefined) delete json.game

                io.to(gameCode).emit('server:sendMessage', json.player2.name + " ha abandonado la partida");
            }

            if(json.host === null){
                fs.unlinkSync(jsonPath);
            }else{
                fs.writeFileSync(jsonPath, JSON.stringify(json));
                fs.chmodSync(jsonPath, 0o777);

                io.to(gameCode).emit('server:updateConfig', getConfig(json));

            }
        }
    }

    controller.expelOpponent = (gameCode) => {
        const dir = path.resolve('./src/rooms');
        const jsonPath = dir+'/'+gameCode+'.json';

        if(fs.existsSync(jsonPath)){
            const json = require(jsonPath);
    
            if(json.player1.id === json.host){
                io.to(json.player2.id).emit('server:expelPlayer');
                json.player2.id = null;
                io.to(gameCode).emit('server:sendMessage', json.player2.name + " ha sido expulsado de la partida");
                io.to(gameCode).emit('server:updateConfig', getConfig(json));
            }else if(json.player2.id === json.host){
                io.to(json.player1.id).emit('server:expelPlayer');
                json.player1.id = null;
                io.to(gameCode).emit('server:sendMessage', json.player1.name + " ha sido expulsado de la partida");
                io.to(gameCode).emit('server:updateConfig', getConfig(json));
            }

            if(json.host === null){
                fs.unlinkSync(jsonPath);
            }else{
                fs.writeFileSync(jsonPath, JSON.stringify(json));
                fs.chmodSync(jsonPath, 0o777);

                io.to(gameCode).emit('server:updateConfig', getConfig(json));
            }
        }
    }

    controller.updateConfig = (data) => {
        const { gameCode, key, value } = data;
        
        const dir = path.resolve('./src/rooms');
        const jsonPath = dir+'/'+gameCode+'.json';

        if(fs.existsSync(jsonPath)){
            const json = require(jsonPath);

            socket.join(gameCode);

            if(json.player1.id === socket.id) json.player1[key] = value
            if(json.player2.id === socket.id) json.player2[key] = value

            fs.writeFileSync(jsonPath, JSON.stringify(json));
            fs.chmodSync(jsonPath, 0o777);

            io.to(gameCode).emit('server:updateConfig', json);
        }else{
            socket.emit('server:canBeHere', {
                title: 'Codigo inválido',
                body: 'El codigo ingresado es incorrecto o ha expirado, verifica que sea correcto e intente nuevamente'
            });
        }
    }

    controller.updateIcon = (data) => {
        const { gameCode, newIcon } = data;
        const dir = path.resolve('./src/rooms');
        const jsonPath = dir+'/'+gameCode+'.json';

        if(fs.existsSync(jsonPath)){
            const json = require(jsonPath);

            let opponentIcon = 'o';
            if(newIcon === 'o') opponentIcon = 'x';
            else if(newIcon === 'r') opponentIcon = 'r';

            if(json.player1.id === socket.id){
                json.player1.icon = newIcon;
                json.player2.icon = opponentIcon;
            }else if(json.player2.id === socket.id){
                json.player2.icon = newIcon;
                json.player1.icon = opponentIcon;
            }

            fs.writeFileSync(jsonPath, JSON.stringify(json));
            fs.chmodSync(jsonPath, 0o777);

            io.to(gameCode).emit('server:updateConfig', json);
        }else{
            socket.emit('server:canBeHere', {
                title: 'Codigo inválido',
                body: 'El codigo ingresado es incorrecto o ha expirado, verifica que sea correcto e intente nuevamente'
            });
        }
    }

    controller.updateStarts = (data) => {
        
        const { gameCode, starts } = data;
        const dir = path.resolve('./src/rooms');
        const jsonPath = dir+'/'+gameCode+'.json';

        if(fs.existsSync(jsonPath)){
            const json = require(jsonPath);
            json.starts = starts;

            fs.writeFileSync(jsonPath, JSON.stringify(json));
            fs.chmodSync(jsonPath, 0o777);

            io.to(gameCode).emit('server:updateConfig', json);
        }else{
            socket.emit('server:canBeHere', {
                title: 'Codigo inválido',
                body: 'El codigo ingresado es incorrecto o ha expirado, verifica que sea correcto e intente nuevamente'
            });
        }
    }

    controller.startGame = (gameCode, restart=false) => {
        
        const dir = path.resolve('./src/rooms');
        const jsonPath = dir+'/'+gameCode+'.json';

        if(fs.existsSync(jsonPath)){
            const json = require(jsonPath);
            const game = {
                board: [['','',''], ['','',''], ['','','']],
                player1: {...json.player1},
                player2: {...json.player2},
                winner: null,
                winnerCell: null
            }
            
            if(json.player1.icon === 'r'){
                const icon1 = Math.random() < 0.5 ? 'x' : 'o';
                const icon2 = icon1 === 'o' ? 'x' : 'o';

                game.player1.icon = icon1;
                game.player2.icon = icon2;  
            }

            const host = json.player1.id === json.host ? game.player1 : game.player2;
            const opponent = json.player2.id === json.host ? game.player1 : game.player2;

            if(json.starts === 'host'){
                game.turn = host.icon;
            }else if(json.starts === 'opponent'){
                game.turn = opponent.icon;
            }else{
                game.turn = Math.random() < 0.5 ? 'x' : 'o';
            }

            json.game = game;

            const player = getPlayerByTurn(json.game);
            io.to(gameCode).emit('server:sendMessage',  `${player.name} (${player.icon.toUpperCase()}) Comienza la partida`);
            
            if(restart) io.to(gameCode).emit('server:restart', json);
            
            fs.writeFileSync(jsonPath, JSON.stringify(json));
            fs.chmodSync(jsonPath, 0o777);

            io.to(gameCode).emit('server:updateConfig', json);
        }else{
            socket.emit('server:canBeHere', {
                title: 'Codigo inválido',
                body: 'El codigo ingresado es incorrecto o ha expirado, verifica que sea correcto e intente nuevamente'
            });
        }
    }

    controller.disconnect = () => {
        const dir = path.resolve('./src/rooms');
        const exists = fs.existsSync(dir);

        if(!exists){
            fs.mkdirSync(dir);
        }
        const files = fs.readdirSync(dir);

        files.forEach(f => {
            const jsonPath = dir+'/'+f;

            const json = require(jsonPath);
            const gameCode = f.split('.')[0];

            if(json.player1.id === socket.id){
                if(json.host === socket.id) json.host = json.player2.id;
                json.player1.id = null;
                if(json.game != undefined) delete json.game
                io.to(gameCode).emit('server:sendMessage', json.player1.name + " ha abandonado la partida");
            }else if(json.player2.id === socket.id){
                if(json.host === socket.id) json.host = json.player1.id;
                json.player2.id = null;
                if(json.game != undefined) delete json.game
                io.to(gameCode).emit('server:sendMessage', json.player2.name + " ha abandonado la partida");
            }
            
            
            socket.leave(gameCode);

            if(json.host === null){
                fs.unlinkSync(jsonPath);
            }else{
                fs.writeFileSync(jsonPath, JSON.stringify(json));
                fs.chmodSync(jsonPath, 0o777);

                io.to(gameCode).emit('server:updateConfig', getConfig(json, socket.id));
            }
        });
    }

    controller.selectBox = (data) => {
        const { gameCode, row, column, player } = data;

        const dir = path.resolve('./src/rooms');
        const jsonPath = dir+'/'+gameCode+'.json';

        if(fs.existsSync(jsonPath)){
            const json = require(jsonPath);
            
            json.game.board[row][column] = player.icon;
            json.game.turn = json.game.turn === 'x' ? 'o' : 'x';
            json.game.winner = checkForWinner(json.game.board);
            json.game.winnerCell = getWinnerCell(json.game.board);
            
            fs.writeFileSync(jsonPath, JSON.stringify(json));
            fs.chmodSync(jsonPath, 0o777);

            io.to(gameCode).emit('server:updateConfig', json);
        }else{
            socket.emit('server:canBeHere', {
                title: 'Codigo inválido',
                body: 'El codigo ingresado es incorrecto o ha expirado, verifica que sea correcto e intente nuevamente'
            });
        }
    }

    controller.backToRoom = (gameCode) => {
        const dir = path.resolve('./src/rooms');
        const jsonPath = dir+'/'+gameCode+'.json';

        if(fs.existsSync(jsonPath)){
            const json = require(jsonPath);

            delete json.game;

            io.to(gameCode).emit('server:sendMessage',  "El host ha indicado volver a la sala de espera");

            fs.writeFileSync(jsonPath, JSON.stringify(json));
            fs.chmodSync(jsonPath, 0o777);

            io.to(gameCode).emit('server:updateConfig', json);
        }else{
            socket.emit('server:canBeHere', {
                title: 'Codigo inválido',
                body: 'El codigo ingresado es incorrecto o ha expirado, verifica que sea correcto e intente nuevamente'
            });
        }
    }


    return controller;
}

module.exports = socketController;

function generateGameCode(){
    let code = '';
    const caracteres = '0123456789';
    const len = 8;
    
    for (let i = 0; i < len; i++) {
        const indx = Math.floor(Math.random() * caracteres.length);
        code += caracteres.charAt(indx);
    }
    
    return code;
}

function getConfig(json){
    return json;
}

function getPlayerByTurn(game){
    const { player1, player2, turn } = game;
    
    return player1.icon === turn ? player1 : player2;
}

function checkForWinner( board ){
    for (let i = 0; i < 3; i++) {
        if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][1] === board[i][2]) return board[i][0];
    }

    for (let i = 0; i < 3; i++) {
        if (board[0][i] !== '' && board[0][i] === board[1][i] && board[1][i] === board[2][i]) return board[0][i]; 
    }

    if (board[0][0] !== '' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) return board[0][0];
    if (board[0][2] !== '' && board[0][2] === board[1][1] && board[1][1] === board[2][0]) return board[0][2];
    
    let empate = true;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                empate = false;
                break;
            }
        }
        if (!empate) break;
    }
    if (empate) return '0';

    return null;
}

function getWinnerCell(board){
    for (let i = 0; i < 3; i++) {
        if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][1] === board[i][2]) return i+1;
    }
    
    for (let i = 0; i < 3; i++) {
        if (board[0][i] !== '' && board[0][i] === board[1][i] && board[1][i] === board[2][i]) return i+4; 
    }
    
    if (board[0][0] !== '' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) return 7;
    if (board[0][2] !== '' && board[0][2] === board[1][1] && board[1][1] === board[2][0]) return 8;
        
    let empate = true;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                empate = false;
                break;
            }
        }
        if (!empate) break;
    }
    if (empate) return 0;
    
    return null;
}