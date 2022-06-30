const express = require('express');
const router = express.Router();
const bot = require("../Data/databot");
const database = require("../Data/data")
//const CoinNameList = ["Eth" , "Ftm", "Matic", "Bnb"];
let CoinNameList = database.CoinNames.getAll();

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

router.get("/allFees" , (req, res, next) => {
    let coinInfo = {};
    let coinInfoList = [];
    for(i = 0; i < CoinNameList.length; i++){
        coinInfo =  database.GasFees.Fees.getCoin(CoinNameList[i]);
        coinInfoList[coinInfoList.length] = coinInfo;
    }
    res.json(coinInfoList);
})

router.get("/allMetaData" , (req, res, next) => {
    let coinMeta = {};
    let coinMetaList = [];
    for(i = 0; i < CoinNameList.length; i++){
        coinMeta =  database.GasFees.MetaData.getCoin(CoinNameList[i]);
        coinMetaList[coinMetaList.length] = coinMeta;
    }
    res.json(coinMetaList);
})

router.get("/allData" , (req, res, next) => {
    let coinMetaInfo = {};
    let coinGasInfo = {};
    let coinInformationList = [];
    for(i = 0; i < CoinNameList.length; i++){
        coinMetaInfo =  database.GasFees.MetaData.getCoin(CoinNameList[i]);
        coinGasInfo =  database.GasFees.Fees.getCoin(CoinNameList[i]);
        //It comes out as coinMetaInfo: the info and coinGasInfo: the info in one object.
        coinInformationList[coinInformationList.length] = {coinMetaInfo , coinGasInfo};
    }
    res.json(coinInformationList);
})

module.exports = router;
