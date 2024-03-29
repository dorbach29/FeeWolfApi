//METADATA
const ExchangeMetaData = {
    Exchanges : {
        "Coinbase" : {
            logoLink : "/Exchange/CoinbaseLogo.png",
            logoDesc : "Coinbase Logo",
            name : "Coinbase",
            exchangeID: 1,
        },
        "Gemini" :  {
            logoLink : "/Exchange/GeminiLogo.jpg",
            logoDesc : "Gemini Logo",
            name : "Gemini",
            exchangeID: 2,
          },
        "Kucoin" : {
            logoLink : "/Exchange/KucoinLogo.png",
            logoDesc : "Kucoin Logo",
            name: "Kucoin",
            exchangeID: 3,
        },
        "Binance" : {
            logoLink : "/Exchange/BinanceLogo.png",
            logoDesc : "Binance Logo",
            name: "Binance",
            exchangeID: 4,
        },
        "CryptoCom" : {
            logoLink : "/Exchange/CryptocomLogo.png",
            logoDesc : "CryptoCom Logo",
            name: "CryptoCom",
            exchangeID: 5,
        },
        "FTX" : {
            logoLink : "/Exchange/FTXLogo.png",
            logoDesc : "FTX Logo",
            name: "FTX",
            exchangeID: 13,
        },
    }
};
//Exchange Methods
// True = MarketOrder (maker), False = Limit Order (taker)
//Maker = market Order
//Taker = limit order
function CoinbaseFee(amount){
    let coinFee = 0;
    if(amount < 10){
        coinFee = .99;
    } else if(amount < 25){
        coinFee = 1.49;
    } else if(amount < 50){
        coinFee = 1.99;
    } else if (amount < 200){
        coinFee = 2.99;
    }
    else {
        coinFee = 0.019 * amount;
    }
    return amount - coinFee;
    //it would be return amount + coinFee if we want the actual whole cost.
}

function GeminiFee(amount){
    let gemFee = 0;
    //This is specific to USD obviously.
    if(amount <= 10){
        gemFee = 0.99;
    } 
    else if ((amount > 10)&&(amount <= 25)){
        gemFee = 1.49;
    }
    else if ((amount > 25)&&(amount <= 50)){
        gemFee = 1.99;
    }
    else if ((amount > 50)&&(amount < 200)){
        gemFee = 2.99;
    }
    else if (amount >= 200){
        //Above 200 is 1.49%
        gemFee = amount * .0149;
    }
    //return gemFee;
    return amount - gemFee;
    //return gemFee + amount
}


function KuCoinFee(amount, marketOrder){
    let kuFee = 0.0;
    /*Maker Fees
    There is 0 transaction fee for maker orders with 2000 to <15000 being traded
    However, 15000+ there is a negative fee ? Need to discuss this.
    */
    if (marketOrder == true){
        if(amount < 50.00){
            kuFee = amount * .001;
        } 
        else if((amount >= 50.00)&&(amount < 200.00)){
            kuFee = amount * .0009;
        }
        else if((amount >= 200.00)&&(amount < 500)){
            kuFee = amount * .0007;
        }
        else if((amount >= 500.00)&&(amount < 1000)){
             kuFee = amount * .0005;
        }
        else if((amount >= 1000)&&(amount < 2000)){
             kuFee = amount * .0003;
        }
        else if((amount >= 2000)&&(amount < 4000)){
            kuFee = amount;
        }
        else if((amount >= 4000)&&(amount < 8000)){
            kuFee = amount;
        }
        else if((amount >= 8000)&&(amount < 15000)){
            kuFee = amount;
        }
        else if((amount >= 15000)&&(amount < 25000)){
            kuFee = amount * -.00005;
        }
        else if((amount >= 25000)&&(amount < 40000)){
            kuFee = amount * -.00005;
        }
        else if((amount >= 40000)&&(amount < 60000)){
            kuFee = amount * -.00005;
        }
        else if(amount >= 60000){
            kuFee = amount * -.00005;
        }
    }
    if (marketOrder == false){
        if(amount < 50.00){
            kuFee = amount * .001;
        } 
        else if((amount >= 50.00)&&(amount < 200.00)){
            kuFee = amount * .001;
        }
        else if((amount >= 200.00)&&(amount < 500)){
            kuFee = amount * .0009;
        }
        else if((amount >= 500.00)&&(amount < 1000)){
             kuFee = amount * .0008;
        }
        else if((amount >= 1000)&&(amount < 2000)){
             kuFee = amount * .0007;
        }
        else if((amount >= 2000)&&(amount < 4000)){
            kuFee = amount * .0007;
        }
        else if((amount >= 4000)&&(amount < 8000)){
            kuFee = amount*.0006;
        }
        else if((amount >= 8000)&&(amount < 15000)){
            kuFee = amount * .0005;
        }
        else if((amount >= 15000)&&(amount < 25000)){
            kuFee = amount * .00045;
        }
        else if((amount >= 25000)&&(amount < 40000)){
            kuFee = amount * .0004;
        }
        else if((amount >= 40000)&&(amount < 60000)){
            kuFee = amount * .00035;
        }
        else if(amount >= 60000){
            kuFee = amount * .0003;
        }
    }
    return amount - kuFee;
    //return kuFee + amount
}

function BinanceFee(amount){
    let biFee = 0.0;
    biFee = amount * .0010;
    return amount - biFee;
}

function CryptoComFee(amount, marketOrder){
    let comFee = 0.0;
    
    if (marketOrder){
        if(amount <= 25000){
            comFee = amount * .004;
        } 
        else if((amount >= 25001)&&(amount <= 50000)){
            comFee = amount * .0035;
        }
        else if((amount >= 50001)&&(amount < 100000)){
            comFee = amount * .0015;
        }
        else if((amount >= 100001)&&(amount < 250000)){
             comFee = amount * .001;
        }
        else if((amount >= 250001)&&(amount < 1000000)){
             comFee = amount * .0009;
        }
        else if((amount >= 1000001)&&(amount < 20000000)){
            comFee = amount * .0008;
        }
        else if((amount >= 20000001)&&(amount < 100000000)){
            comFee = amount * .0007;
        }
        else if((amount >= 100000001)&&(amount < 200000000)){
            comFee = amount * .0006;
        }
    }
    if (!marketOrder){
        if(amount <= 25000){
            comFee = amount * .004;
        } 
        else if((amount >= 25001)&&(amount <= 50000)){
            comFee = amount * .0035;
        }
        else if((amount >= 50001)&&(amount < 100000)){
            comFee = amount * .0025;
        }
        else if((amount >= 100001)&&(amount < 250000)){
             comFee = amount * .0016;
        }
        else if((amount >= 250001)&&(amount < 1000000)){
             comFee = amount * .0015;
        }
        else if((amount >= 1000001)&&(amount < 20000000)){
            comFee = amount * .0014;
        }
        else if((amount >= 20000001)&&(amount < 100000000)){
            comFee = amount * .0013;
        }
        else if((amount >= 100000001)&&(amount < 200000000)){
            comFee = amount * .0012;
        }
    }
    return amount - comFee;
   
}

function FTXFee(amount, marketOrder){
    let ftxFee = 0.0;
    
    if (marketOrder == true){
        if(amount <= 2000000){
            ftxFee = amount * .0020;
        } 
        else if((amount >= 2000000)&&(amount < 5000000)){
            ftxFee = amount * .0015;
        }
        else if((amount >= 5000000)&&(amount < 10000000)){
            ftxFee = amount * .001;
        }
        else if((amount >= 10000000)&&(amount < 25000000)){
             ftxFee = amount * .0005;
        }
        else if((amount >= 25000000)&&(amount < 50000000)){
             ftxFee = amount;
        }
        else if((amount >= 50000000)){
            ftxFee = 0;
        }
    }
    if (marketOrder == false){
        if(amount <= 2000000){
            ftxFee = amount * .0070;
        } 
        else if((amount >= 2000000)&&(amount < 5000000)){
            ftxFee = amount * .0060;
        }
        else if((amount >= 5000000)&&(amount < 10000000)){
            ftxFee = amount * .0055;
        }
        else if((amount >= 10000000)&&(amount < 25000000)){
             ftxFee = amount * .0050;
        }
        else if((amount >= 25000000)&&(amount < 50000000)){
             ftxFee = amount * .0045;
        }
        else if((amount >= 50000000)){
            ftxFee = amount * .0040;
        }
    }
    return amount - ftxFee;

}

function getExchangeData(exchangeName, transactionFees) {
  const exchangeData = ExchangeMetaData.Exchanges[exchangeName];
  if (exchangeData) {
    return {
      ...exchangeData,
      fee: transactionFees[exchangeName]
    };
  } else {
    return null;
  }
}

function getAllTransactions(amount, marketOrder) {
  let data = {};
  const transactionFees = {
    Coinbase: CoinbaseFee(amount),
    Gemini: GeminiFee(amount),
    Kucoin: KuCoinFee(amount, marketOrder),
    Binance: BinanceFee(amount, marketOrder),
    CryptoCom: CryptoComFee(amount),
    FTX: FTXFee(amount, marketOrder),
  };

  // Add the calculated fees to the metadata for each exchange
  Object.keys(transactionFees).forEach((exchange) => {
    data[exchange] = {};
    data[exchange].amount = transactionFees[exchange];
    data[exchange].metadata = ExchangeMetaData.Exchanges[exchange];
  });
  return data;
}

// Define the function to sort the exchanges based on their calculated fees
function sortTransactions(data) {
    // Create an array of the metadata for each exchange
    const exchanges = Object.values(data);
    // Sort the array of exchanges based on the calculated fee
    const sortedExchanges = exchanges.sort((a, b) => {
      // Compare the fees for each exchange
      if (a.amount > b.amount) {
        return -1;
      }
      if (a.amount < b.amount) {
        return 1;
      }
      // If the fees are equal, return 0
      return 0;
    });
    // Return the sorted metadata object
    return sortedExchanges;
  }
  
  // Define the function to print all of the metadata
function printAllMetadata(metadata) {
    // Iterate through the metadata for each exchange
    Object.values(metadata).forEach((exchange) => {
      // Print the metadata for each exchange
      console.log(`Exchange: ${exchange.metadata.name}`);
      console.log(`Logo Link: ${exchange.metadata.logoLink}`);
      console.log(`Logo Description: ${exchange.metadata.logoDesc}`);
      console.log(`Amount: ${exchange.amount}`);
      console.log("------------------------------");
    });
}

function sort(amount){
    const data = getAllTransactions(amount, true);
    console.log(data); // { Coinbase: 48.51, Gemini: 48.01, Kucoin: 49.5, Binance: 49.5, "CryptoCom": 50, FTX: 49.5 }
    /*
    const exchangeData = data.search("Coinbase");
    console.log(exchangeData); // { logoLink: '/Coinbase.png', logoDesc: 'Coinbase Logo', name: 'Coinbase', withdrawlFee: -1, transactionFee: 0, fee: 48.51 }
    */

    console.log("SORTED NOW");
    // Sort the metadata object and store a copy of the sorted object
    const sortedMetadata = sortTransactions(data);
    // Print all of the metadata
    printAllMetadata(sortedMetadata);


}

module.exports = {sortTransactions, getAllTransactions, ExchangeMetaData}