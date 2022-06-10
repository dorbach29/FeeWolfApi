const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const axios = require('axios');
require('dotenv').config();

const bot = require("./bot")




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

bot.config();
io.on("connection", (socket) => {

    bot.start();
    let updateEtherFees = () => {
        socket.emit("EthUpdate" , bot.currData.Eth.fees);        
    }
    let updateEtherAvg = () =>{
        socket.emit("EthUpdateAvg", bot.currData.Eth.hrFeeAvg)
    }
    let updateBSC = () => {
        socket.emit("BnbUpdate" , bot.currData.Bnb.fees);        
    }
    let updateFtm = () => {
        socket.emit("FtmUpdate" , bot.currData.Ftm.fees);        
    }
    let updateMatic = () => {
        socket.emit("FtmUpdate" , bot.currData.Matic.fees);        
    }

    setInterval(updateEtherFees, 5000);
    setInterval(updateBSC, 5000);
    setInterval(updateFtm, 5000);
    setInterval(updateMatic, 5000);
    setInterval(updateEtherAvg, 1000);
})
httpServer.listen(5000);
