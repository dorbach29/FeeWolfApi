const express = require('express');
const router = express.Router();
const bot = require("../Data/databot");
const database = require("../Data/data")
const CoinNameList = ["Eth" , "Ftm", "Matic", "Bnb"];

/**
 * Express route
 * 
 * This file contains the gas route for the REST API. 
 * As of now there are no other routes
 * 
 * All requests starting with /gas are going to be routed to this
 */


/**
 * "/gas"
 */
router.get("/", (req, res , next)=> {
    res.json(bot.currData);
})


/**
 * "/gas/[coinName]"
 */

router.get("/coin/:coin" , (req, res, next) => {
    let coinInfo = {};
    const coin  = req.params.coin;
    coinInfo = database.GasFees.Fees.getCoin(coin)
    res.json(coinInfo);
})

router.get("/allCoins" , (req, res, next) => {
    let coinInfo = {};
    let coinInfoList = [];
    for(i = 0; i < CoinNameList.length; i++){
        coinInfo =  database.GasFees.Fees.getCoin(CoinNameList[i]);
        coinInfoList[coinInfoList.length] = coinInfo;
    }
    res.json(coinInfoList);
})

module.exports = router;
