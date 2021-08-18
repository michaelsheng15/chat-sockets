const http = require('http')
const path = require('path')
const express = require('express')
const socketio = require('socket.io')

const app = express();
const server = http.createServer(app)
const io = socketio(server) //expects it to be called with raw http server so we manually created it

const port = process.env.PORT || 3005;
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))


io.on('connection', (socket)=>{
    console.log('new websocket connection');
    socket.emit('message', 'Welcome!')

    socket.broadcast.emit('message', 'A new user has joined')

    socket.on('sendMessage', (message)=>{
        io.emit('message', message)
        console.log(message);
    })

    socket.on('disconnect', ()=>{
        io.emit('message', "A user has left")
    })
})


server.listen(port, ()=>{
    console.log('Server is up on port ' + port);
})

