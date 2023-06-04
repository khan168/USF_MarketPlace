const fs = require("fs");
const https = require("https");
const io = require("socket.io");

const serverOptions = {
  key: fs.readFileSync(
    "/etc/letsencrypt/live/bullsmarketplace.com/privkey.pem"
  ),
  cert: fs.readFileSync(
    "/etc/letsencrypt/live/bullsmarketplace.com/fullchain.pem"
  ),
};

const server = https.createServer(serverOptions);
const socketServer = io(server, {
  cors: {
    origin:["https://bullsmarketplace.netlify.app/", "https://main--bullsmarketplace.netlify.app/"],
    methods: ["GET", "POST"],
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

socketServer.on("connection", (socket) => {
  console.log("User connected");

  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    socketServer.emit("getUsers", users);
  });

  // Send message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    if (user) {
      socketServer.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    }
  });

  // When disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected");
    removeUser(socket.id);
    socketServer.emit("getUsers", users);
  });
});

server.listen(8900, () => {
  console.log("Socket.IO server is running on port 8900 (HTTPS)");
});
