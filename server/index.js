const express = require('express');
const app = express();
const cors = require('cors');
const {Server} = require('socket.io');
app.use(cors());
const http = require('http');
const server = http.createServer(app);
const io = new Server(server, {
    cors : {
        origin : 'http://localhost:3000',
        methods : ['GET', 'POST', 'PUT']
    }
});
io.on('connection', (socket) => {
    socket.on('join_room', (data) => {
        socket.join(data);
        console.log(`User with id ${socket.id} has joined a room ${data}`);
    });
    socket.on('send_message',(data) => {
        socket.to(data.room).emit("recive_message",data)
    })
    socket.on('disconnect', () => {
        console.log(`disconnected ${socket.id}`);
    })
});

server.listen(3001, () => {
    console.log('SERVER RUNNING ON PORT 3001');
});