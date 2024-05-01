const fs = require('fs');
const { server, app, io } = require('./server');
const color = require('colors/safe');
const path = require('path');
require('./sockets/sockets')(io);

server.listen( app.get('port'), () => {
    console.clear();
    console.log(color.cyan(`[ SERVIDOR ]: Lanzado en el puerto ${app.get('port')}`));

    const folder = path.resolve('./src/rooms')
    try{
        fs.rmSync(folder, { recursive: true });
    }catch(err){
        console.log(color.red(`[ ERROR ]: No se borraron las rooms: `),err);
        
    }

});