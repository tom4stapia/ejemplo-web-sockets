const { Server } = require('socket.io');

let users = [];

const addUser = (userId, socketId) => {
    if (!users.some((user) => user.userId === userId)) {
        users.push({ userId, socketId}); 
    }
}

const findUser = (userId) => {
    return users.find((user) => Number(user.userId) === Number(userId));
}

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
}

const configureSockets = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
        }
    });

    io.on("connection", (socket) => {
        socket.on("addUser", (userId) => {
            if (userId) {
                addUser(userId, socket.id);
            }
        });

        socket.on("disconnect", () => {
            removeUser(socket.id);
        })
    })

    return io;
}

module.exports = { configureSockets, findUser }