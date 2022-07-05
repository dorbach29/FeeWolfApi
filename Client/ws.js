const bot = require("../Data/databot");
const CoinList = require("../Data/data").CoinNames.getAll();
/** This file contains websocket logic for sending the client updates on gas fees
 *  In the future this file will assign all websocket functionality needed to the socket
 * 
 */

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
    for(let i = 0 ; i < CoinList.length; i ++){
        let currCoin = CoinList[i];
        setInterval(()=>{
            sendCoinUpdate(currCoin, socket);
        }, 5000)
    }
}


function handleSocket(socket){
    subscribeSocketGas(socket);
}

module.exports = handleSocket;