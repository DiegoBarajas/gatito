const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();

app.set('port', process.env.PORT || 4000);

app.get("/", (req, res) => {
    res.send("Backend de gatito")
});

const server = http.createServer(app);
const io = socketIo(server, {
    cors: '*'
});

module.exports = { server, app, io };