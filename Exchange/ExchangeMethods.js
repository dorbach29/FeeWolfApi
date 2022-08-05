

/*I think we should have 2 sections of functions. 
One section that calculates what level we are in for each exchange
And then sorting
*/

const exchangeNameList = ["Coinbase", "Gemini", "Kucoin", "Binance", "CryptoCom", "FTX"];
let amount;
let marketOrder = true;
// True = MarketOrder, False = Limit Order (taker)
//Maker = market Order
//Taker = limit order
function CoinbaseFee(amount){
    let coinFee = 0.0;
    if(amount < 10){
        coinFee = .99;
    } else if(amount < 25){
        coinFee = 1.49;
    } else if(amount < 50){
        coinFee = 1.99;
    } else if (amount < 200){
        coinFee = 2.99;
    }
    return coinFee;
    //it would be return amount + coinFee if we want the actual whole cost.
}

function GeminiFee(amount){
    let gemFee = 0.0;
    //This is specific to USD obviously.
    if(amount <= 10.00){
        gemFee = 0.99;
    } 
    else if ((amount > 10.00)&&(amount <= 25.00)){
        gemFee = 1.49;
    }
    else if ((amount > 25.00)&&(amount <= 50.00)){
        gemFee = 1.99;
    }
    else if ((amount > 50.00)&&(amount <= 200.00)){
        gemFee = 2.99;
    }
    else if(amount >200.00){
        //Above 200 is 1.49%
        gemFee = amount * .0149;
    }
    return gemFee;
    //return gemFee + amount
}

function KuCoinFee(amount, marketOrder){
    let kuFee = 0.0;
    /*Maker Fees
    There is 0 transaction fee for maker orders with 1000 to <15000 being traded
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