const express = require('express');
const router = express.Router();
const bot = require("../Data/databot");
const database = require("../Data/data")

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
router.get("/:coin" , (req, res, next) => {
    let coinInfo = {};
    const coin  = req.params.coin;
    coinInfo = database.GasFees.Fees.getCoin(coin)
    res.json(coinInfo);
})

module.exports = router;
