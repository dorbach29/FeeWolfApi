const express = require("express");
const router = express.Router();

const getAllTransactions = require("../Exchange/ExchangeLogic").getAllTransactions;
const sortTransactions = require("../Exchange/ExchangeLogic").sortTransactions;


const MetaData = require("../Exchange/ExchangeLogic");
const CoinbaseFee = require("../Exchange/ExchangeLogic").CoinbaseFee;
const GeminiFee = require("../Exchange/ExchangeLogic").GeminiFee;
const KuCoinFee = require("../Exchange/ExchangeLogic").KuCoinFee;
const BinanceFee = require("../Exchange/ExchangeLogic").BinanceFee;
const CryptoComFee = require("../Exchange/ExchangeLogic").CryptoComFee;
const FTXFee = require("../Exchange/ExchangeLogic").FTXFee;
let data = MetaData.ExchangeMetaData;

/**
 * "/exchanges"
 * 
 * Returns the entire ExchangeMetaData object.
 */
router.get("/", (req, res, next) => {
  res.json(data);
});



router.get("/cheapest", (req, res, next) => {
  let amount = req.params.amount;
  let newData = getAllTransactions(amount, true);
  let sortedMetadata = sortTransactions(newData);
  res.json(sortedMetadata);
})

/**
 * "/exchanges/:exchange/fees"
 * 
 * Returns the fee for a trade on the specified exchange.
 * 
 * @param {string} exchange - The name of the exchange.
 */
router.get("/:exchange/fees", (req, res, next) => {
  // Get the name of the exchange from the request
  const exchange = req.params.exchange;

  // Initialize the fee variable
  let fee;

  // Determine which exchange's fee function to call based on the exchange name
  switch (exchange) {
    case "Coinbase":
      fee = CoinbaseFee(amount);
      break;
    case "Gemini":
      fee = GeminiFee(amount);
      break;
    case "Kucoin":
      fee = KuCoinFee(amount, marketOrder);
      break;
    case "Binance":
      fee = BinanceFee(amount, marketOrder);
      break;
    case "CryptoCom":
      fee = CryptoComFee(amount, marketOrder);
      break;
    case "FTX":
      fee = FTXFee(amount, marketOrder);
      break;
    default:
      fee = null;
      break;
  }

  // Return the fee in the response
  res.json({ fee });
});

module.exports = router;