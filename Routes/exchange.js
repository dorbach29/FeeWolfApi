const express = require("express");
const router = express.Router();

// Import the exchange data and functions
const ExchangeMetaData = require("./path/to/exchange/data");
const CoinbaseFee = require("./path/to/exchange/data").CoinbaseFee;
const GeminiFee = require("./path/to/exchange/data").GeminiFee;
const KuCoinFee = require("./path/to/exchange/data").KuCoinFee;
const BinanceFee = require("./path/to/exchange/data").BinanceFee;
const CryptoComFee = require("./path/to/exchange/data").CryptoComFee;
const FTXFee = require("./path/to/exchange/data").FTXFee;

/**
 * "/exchanges"
 * 
 * Returns the entire ExchangeMetaData object.
 */
router.get("/", (req, res, next) => {
  res.json(ExchangeMetaData);
});

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
