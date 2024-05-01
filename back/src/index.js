const { server, app, io } = require('./server');
const color = require('colors/safe');
const path = require('path');
require('./sockets/sockets')(io);

server.listen( app.get('port'), () => {
    console.clear();
    console.log(color.cyan(`[ SERVIDOR ]: Lanzado en el puerto ${app.get('port')}`));
});