const socket = (io) => {
    io.on('connect', (socket) => {
        const controller = require('./socket.controller')(io, socket);

        socket.on('client:createRoom', controller.createRoom);
        socket.on('client:joinRoom', controller.joinRoom);
        socket.on('client:startGame', controller.startGame);
        socket.on('client:canBeHere', controller.canBeHere);
        socket.on('client:leaveRoom', controller.leaveRoom);
        socket.on('client:getConfig', controller.getConfig);
        socket.on('client:updateConfig', controller.updateConfig);
        socket.on('client:updateIcon', controller.updateIcon);
        socket.on('client:updateStarts', controller.updateStarts);
        socket.on('client:expelOpponent', controller.expelOpponent);

        socket.on('client:selectBox', controller.selectBox)
        socket.on('client:backToRoom', controller.backToRoom)

        socket.on('disconnect', controller.disconnect)

    });
}

module.exports = socket;