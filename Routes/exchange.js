const express = require('express');
const router = express.Router();
const bot = require("../Exchange/ExchangeHandler");
const database = require("../Exchange/ExchangeData");
//const CoinNameList = ["Eth" , "Ftm", "Matic", "Bnb"];
let ExchangeList = database.ExchangeNames.getAll();
/**
 * Express API
 */
router.get("/",(req,res,next) => {
    res.json("IDK YET");
})




/** find 
 *  param : amount user wants to spend
 *  returns: list of exchange names with the fee they will take
 * 
 * 
 * for each exchange in exchange methods
 *   calculate fee
 *   put in list
 * 
 * call hea
 */

 /** getExchange
  *  param: exchange name
  *  return: exchange info
  */