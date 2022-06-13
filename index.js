const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const axios = require('axios');
require('dotenv').config();

const bot = require("./bot")




//Server/Socket.io initialization 
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: true,
  },
});

bot.config();
if(process.argv[2] == "Test")
{
 
}

/**
 * Emits an event containing the current data of a particular coin
 * @param {string} coinName  - Name of the coin to send data of 
 * @param {socket} socket - Socket.io socket
 */
function sendCoinUpdate(coinName, socket){
    const data = bot.getCoinData(coinName);
    const event = coinName + "Update";
    socket.emit(event, data);
}

/**
 * Subscirbes the socket to listen to GasFee Table updates
 * Sets intervals that periodically send out events with respect to certain coins
 * @param {socket} socket 
 */
function subscribeSocketGas(socket){
    const CoinList = bot.getCoinList();
    for(let i = 0 ; i < CoinList.length; i ++){
        let currCoin = CoinList[i];
        setInterval(()=>{
            sendCoinUpdate(currCoin, socket);
        }, 5000)
    }

}

//Socket.io event updates
io.on("connection", (socket) => {

    bot.start();
    subscribeSocketGas(socket);    
})


httpServer.listen(5000);



