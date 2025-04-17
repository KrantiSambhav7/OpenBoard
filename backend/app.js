const express = require('express');
const socket = require('socket.io');
const app = express();

app.use(express.static('public'));

let server = app.listen(3000 , () => {
    console.log("Hello from server")
})

let io = socket(server);
io.on('connection', (socket) => {
    console.log('New user connected', socket.id);
    socket.on("beginPath" , (data) => {
        io.sockets.emit("beginPath" , data);
    })
    socket.on("drawStroke" , (data) => {
        io.sockets.emit("drawStroke" , data);
    })
    socket.on("redoUndo" , (data) => {
        io.sockets.emit("redoUndo" , data);
    })
});
