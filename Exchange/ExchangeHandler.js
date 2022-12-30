const { ExchangeMetaData } = require("./ExchangeData");

/**
 * functions that handle the logic for the api calls
 */
const method = require( './ExchangeMethods');
const Database = require("./ExchangeData").ExchangeFees;
const list = require("./ExchangeData").ExchangeNames.getAll();

module.exports = {
    self : -1,
    config(){
        self = this;
    },
    getExchangeData(exchangeName){
        return Database.getExchange(exchangeName);
    },

    setNewCoinbaseFee(num){
        try{
            let newFee = method.CoinbaseFee(num);
            Database.TransactionFee.setExchangeFee("Coinbase", newFee);
        } catch(error){
            console.log(error);
        }
    },
     setNewGemeniFee(num){
        try{
            let newFee = method.GeminiFee(num);
            Database.TransactionFee.setExchangeFee("Gemini", newFee);
        } catch(error){
            console.log(error);
        }
    },
     setNewKuCoinFee(num, marketOrder){
        try{
            let newFee = method.KuCoinFee(num, marketOrder);
            Database.TransactionFee.setExchangeFee("KuCoin", newFee);
        } catch(error){
            console.log(error);
        }
    },
     setNewBinanceFee(num){
        try{
            let newFee = method.BinanceFee(num);
            Database.TransactionFee.setExchangeFee("Binance", newFee);
        } catch(error){
            console.log(error);
        }
    },
     setNewCryptoComFee(num, marketOrder){
        try{
            let newFee = method.CryptoComFee(num, marketOrder);
            Database.TransactionFee.setExchangeFee("Crypto.com", newFee);
        } catch(error){
            console.log(error);
        }
    },
     setNewFTXFee(num){
        try{
            let newFee = method.FTXFee(num, marketOrder);
            Database.TransactionFee.setExchangeFee("Coinbase", newFee);
        } catch(error){
            console.log(error);
        }
    },



}
