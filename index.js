const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const bot = require("./GasFees/FeeBot");
const handleSocket = require("./Routes/gas.sockets"); //websocket api
const gasRoute = require("./Routes/gas");
bot.config();
bot.start();


//Initializing https server and routes
const app = express();
app.use("/gas", gasRoute);
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: true,
  },
});

//Initializing socket.io events
io.on("connection", (socket) => {
    handleSocket(socket);
})

//Listening on port 5000
httpServer.listen(5000);



