const axios = require('axios')
const CoinNames = require("./data").CoinNames.getAll();

/**
 * A mapping of the Coin ID's on our end to those CoinGecko uses
 * for their API
 */
const CoinGeckoIds = {
    "Eth" : "ethereum",
    "Bnb" : "binancecoin",
    "Ftm" : "fantom",
    "Matic" : "matic-network",
    "Dot" : "polkadot",
    "Icp" : "internet-computer",
    "Sol" : "solana",
    "Car" : "cardano"
}

function coinGeckoIdString(){
    let retString = ""
    for(let i = 0; i < CoinNames.length; i++){
        retString += CoinGeckoIds[CoinNames[i]];
        retString += ",";
    }
    return retString;
}

function formatCoinGeckoData(data){
    const retObject = {};
    for(let i = 0; i < CoinNames.length; i++){
        let coin = CoinNames[i];
        retObject[coin] = data[CoinGeckoIds[coin]].usd;
    }
    return retObject;
}

module.exports = {

    async getCoinPrices(){
        try{
            const ids= coinGeckoIdString();
            const vs_currencies = "usd";
            const response = await axios({
                method : "get",
                url : "https://api.coingecko.com/api/v3/simple/price",
                params : {
                    ids,
                    vs_currencies 
                },
                responseType : "application/json"
            })
            return formatCoinGeckoData(response.data);
        } catch (error) {
            console.log(error);
        }
    }

}




