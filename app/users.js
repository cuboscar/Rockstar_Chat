module.exports = function (io) {
    var users = {};
    var messages = [];
    io.on('connection', function (socket) {
        //create user
        if (!users.hasOwnProperty(socket.id)) {
            users[socket.id] = {};
            console.log(socket.id)
        }
        socket.emit('new-connection', {
            id: socket.id,
            messages: messages

        });

        console.log('a user connected');
        socket.on('disconnect', function () {
            console.log('user disconnected');
        });
        socket.on('start-writing', function (user) {
            io.emit('start-writing', user);
        });

        socket.on('stop-writing', function (user) {
            io.emit('stop-writing', user);
        });
        socket.on('chat-message', function (msg) {
            messages.push(msg);
            io.emit('chat-message', msg);
            console.log(messages)
            console.log("message received on backend")
        });
    });

}


//https://socket.io/get-started/chat/