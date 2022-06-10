const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const axios = require('axios');
require('dotenv').config();

const bot = require("./bot")



//Temporary variable to record the current ether gas fee
bot.config();
bot.start();

//Server/Socket.io initialization and example of how it can be used
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: true,
  },
});

/*
For the gas fee table Every Coin Should Have the following object 
{
    lowFee - the current lowFee  - not updated un
    medFee - the current midFee
    highFee - the current highFee
    price   - the current price of the coin
    hrFee - The medFee of the coin one hour ago. Update every hour. 
}
*/

io.on("connection", (socket) => {

    let updateEther = () => {
        socket.emit("EthUpdate" , bot.currData.Eth);        
    }
    let updateBSC = () => {
        socket.emit("BnbUpdate" , bot.currData.Bnb);        
    }
    let updateFtm = () => {
        socket.emit("FtmUpdate" , bot.currData.Ftm);        
    }
    let updateMatic = () => {
        socket.emit("FtmUpdate" , bot.currData.Matic);        
    }

    setInterval(updateEther, 5000);
    setInterval(updateBSC, 5000);
    setInterval(updateFtm, 5000);
    setInterval(updateMatic, 5000);
})
httpServer.listen(5000);
