const { ExchangeMetaData } = require("./ExchangeData");

// Import ExchangeMethods module
const ExchangeMethods = require('./ExchangeMethods');

// Import ExchangeData module
const ExchangeData = require("./ExchangeData");
const Database = ExchangeData.ExchangeFees;
const list = ExchangeData.ExchangeNames.getAll();

module.exports = {
  // Remove unnecessary self and config functions

  // Get exchange data
  getExchangeData(exchangeName) {
    return Database.getExchange(exchangeName);
  },

  // Calculate and set new Coinbase fee
  setNewCoinbaseFee(num) {
    try {
      // Calculate Coinbase fee
      let coinbaseFee = ExchangeMethods.CoinbaseFee(num);
      // Set Coinbase fee
      Database.TransactionFee.setExchangeFee("Coinbase", coinbaseFee);
    } catch(error) {
      console.log(error);
    }
  },

  // Calculate and set new Gemini fee
  setNewGemeniFee(num) {
    try {
      // Calculate Gemini fee
      let geminiFee = ExchangeMethods.GeminiFee(num);
      // Set Gemini fee
      Database.TransactionFee.setExchangeFee("Gemini", geminiFee);
    } catch(error) {
      console.log(error);
    }
  },

  // Calculate and set new KuCoin fee
  setNewKuCoinFee(num, marketOrder) {
    try {
      // Calculate KuCoin fee
      let kucoinFee = ExchangeMethods.KuCoinFee(num, marketOrder);
      // Set KuCoin fee
      Database.TransactionFee.setExchangeFee("KuCoin", kucoinFee);
    } catch(error) {
      console.log(error);
    }
  },

  // Calculate and set new Binance fee
  setNewBinanceFee(num) {
    try {
      // Calculate Binance fee
      let binanceFee = ExchangeMethods.BinanceFee(num);
      // Set Binance fee
      Database.TransactionFee.setExchangeFee("Binance", binanceFee);
    } catch(error) {
      console.log(error);
    }
  },

  // Calculate and set new Crypto.com fee
  setNewCryptoComFee(num, marketOrder) {
    try {
      // Calculate Crypto.com fee
      let cryptoComFee = ExchangeMethods.CryptoComFee(num, marketOrder);
      // Set Crypto.com fee
      Database.TransactionFee.setExchangeFee("Crypto.com", cryptoComFee);
    } catch(error) {
      console.log(error);
    }
  },

  // Calculate and set new FTX fee
  setNewFTXFee(num, marketOrder) {
    try {
      // Calculate FTX fee
      let ftxFee = ExchangeMethods.FTXFee(num, marketOrder);
        // Set FTX fee
        Database.TransactionFee.setExchangeFee("FTX", ftxFee);
        } catch(error) {
        console.log(error);
        }
  }
}
