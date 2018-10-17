'use strict'

const http = require('http');
const express = require('express');
const debug = require('debug')('myserver:server');

const app = require('./src/app');

const port = normalizePort(process.env.PORT || '3002');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

console.log('running...');

function normalizePort(value){
    const port = parseInt(value, 10);
    if(isNaN(port)){
        return value;
    }
    if(port >= 0){
        return port;
    }
    return false;
}

function onError(error){
    if(error.syscall !== 'listen'){
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    switch(error.code){
        case 'EACCESS':
            console.error(bind + ' requires elevated privileges');
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening(){
    const addr = server.address();

    const bind = typeof addr === 'string'
        ? 'Pipe ' + addr 
        : 'Port' + addr.port;
    debug('Listening on' + bind);
}