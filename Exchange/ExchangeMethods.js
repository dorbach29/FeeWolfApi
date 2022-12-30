const axios = require('axios');
require('dotenv').config();

//const exchangeNameList = ["Coinbase", "Gemini", "Kucoin", "Binance", "CryptoCom", "FTX"];
let amount;
let marketOrder = true;
// True = MarketOrder (maker), False = Limit Order (taker)
//Maker = market Order
//Taker = limit order
function CoinbaseFee(amount){
    let coinFee = {
        transactionFee : -1,
    }
    if(amount < 10){
        coinFee.transactionFee = .99;
    } else if(amount < 25){
        coinFee.transactionFee = 1.49;
    } else if(amount < 50){
        coinFee.transactionFee = 1.99;
    } else if (amount < 200){
        coinFee.transactionFee = 2.99;
    }
    return coinFee;
    //it would be return amount + coinFee if we want the actual whole cost.
}

function GeminiFee(amount){
    let gemFee= {
        transactionFee : -1,
    }
    //This is specific to USD obviously.
    if(amount <= 10.00){
        gemFee.transactionFee = 0.99;
    } 
    else if ((amount > 10.00)&&(amount <= 25.00)){
        gemFee.transactionFee = 1.49;
    }
    else if ((amount > 25.00)&&(amount <= 50.00)){
        gemFee.transactionFee = 1.99;
    }
    else if ((amount > 50.00)&&(amount <= 200.00)){
        gemFee.transactionFee = 2.99;
    }
    else if(amount >200.00){
        //Above 200 is 1.49%
        gemFee.transactionFee = amount * .0149;
    }
    return gemFee;
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
    return kuFee;
    //return kuFee + amount
}

function BinanceFee(amount){
    let biFee = 0.0;
    biFee = amount * .0010;
    return biFee;
}

function CryptoComFee(amount, marketOrder){
    let comFee = 0.0;
    
    if (marketOrder == true){
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
    if (marketOrder == false){
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
    return comFee;
    //return kuFee + amount
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
        else if((amount > 50000000)){
            ftxFee = amount;
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
        else if((amount > 50000000)){
            ftxFee = amount * .0040;
        }
    }
    return ftxFee;

}

