const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const axios = require("axios");
require('dotenv').config();


//Temporary variable to record the current ether gas fee
let etherGasFee = 1;
/**
 * Example of how we could update this variable using the crypto api
 */

async function getNewEtherPrice(){
    try {
        const apiKey = process.env.ETHERKEY;
        const response = await axios.get(`https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${apiKey}`);
        let newGasPrice = response.data.result.ProposeGasPrice;
        console.log(`New Gas Fee is : ${newGasPrice}`);
        etherGasFee = newGasPrice;

    } catch (error) {
        console.log(error);
    }
}
setInterval(getNewEtherPrice, 7000);


//Server/Socket.io initialization and example of how it can be used
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: true,
  },
});

io.on("connection", (socket) => {

    let updateEther = () => {
        socket.emit("EtherUpdate" , {"GasFee" : etherGasFee});        
    }

    setInterval(updateEther, 1000);
})
httpServer.listen(5000);
