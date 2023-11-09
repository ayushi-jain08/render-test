const cors = require("cors");
const io = require("socket.io")(5000, {
    pingTimeout: 60000, // 60 seconds
    pingInterval: 25000, // 25 seconds
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket) => {
    console.log("Connected to socket-io")

    socket.on("setup", (userData) => {
        socket.join(userData._id)
        socket.emit("connected")
    })
    socket.on("join chat", (room) => {
        socket.join(room)
    })

socket.on("user add", ({name, chat}) => {
    console.log("chatId", chat)
    console.log("username", name)
    if (!chat || !chat.users || !Array.isArray(chat.users)) {
        console.log("Chat users not found in the expected structure.");
        return;
    }
    chat.users.forEach((user) => {
        if (user._id !== chat.groupAdmin._id) {
            // Skip the group admin since they are the one adding users
            socket.in(user._id).emit('user joined', {
                msg: `${name} added to chat`,
                chatId: chat._id,
            });
        }
    });
})

socket.on("typing", (room) => socket.in(room).emit("typing"))
socket.on("stop typing", (room) => socket.in(room).emit("stop typing"))

    socket.on("send msg", (newMessageRec) => {
        var chat = newMessageRec.chat
        if (!chat || !chat.users || !Array.isArray(chat.users)) {
            console.log("Chat users not found in the expected structure.");
            return;
        }
console.log("msg", chat.users)
        if(!chat.users) return ("chat user is not defined")

        chat.users.forEach((user) => {
            if (user._id == newMessageRec.sender._id) return;
            socket.in(user._id).emit("msg recieved", newMessageRec);
          });
    })

    socket.off("setup", () => {
        console.log("user disconnected")
        socket.leave(userData._id)
    })
  })