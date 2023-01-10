const {getAllTransactions, sortTransactions} = require("../Exchange/ExchangeLogic");

function sort(amount){
    const data = getAllTransactions(amount, true);
    console.log(data.transactionFees); // { Coinbase: 48.51, Gemini: 48.01, Kucoin: 49.5, Binance: 49.5, "CryptoCom": 50, FTX: 49.5 }
    /*
    const exchangeData = data.search("Coinbase");
    console.log(exchangeData); // { logoLink: '/Coinbase.png', logoDesc: 'Coinbase Logo', name: 'Coinbase', withdrawlFee: -1, transactionFee: 0, fee: 48.51 }
    */


    // Sort the exchanges based on their calculated fees
    //sortTransactions(ExchangeMetaData);
    // Print all of the metadata
    //printAllMetadata(ExchangeMetaData);
    console.log("SORTED NOW");
    // Sort the metadata object and store a copy of the sorted object
    const sortedMetadata = sortTransactions(data);
    // Print all of the metadata
    printAllMetadata(sortedMetadata);
}