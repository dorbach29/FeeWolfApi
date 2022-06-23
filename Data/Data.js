/** FILE DESCRIPTION
 *  This file will eventually handle all methods needed for querying the database
 *  For now data is simply stored in memory (This file) and so the methods reflect that
 */


/******************************************************************************************
 * @description CoinNames Currently Displayed on GasFee Table as well as a way to get these Coin Names
 */

const CoinNamesList = ["Eth" , "Ftm", "Matic", "Bnb", "Icp", "Dot", "Sol", "Car"];

function coinsGetAll(){
    return [...CoinNamesList];
}

/***************************************************************************************
 * @description Data regarding the current gas fees for each coin. 
 * Each Coin in the list of current used coins has a copy of the data schema defined
 * Getter/Setter Methods are required for each particular attribute this coin has
 */
const FeeData = {};
const feeDataSchema = () => {return {
    fees : {
        lowFee : -1,
        medFee : -1,
        highFee: -1,
    },
    hrFeeSum : 0,
    hrFeeCount : 0,
    hrFeeAvg: -1,
    price: -1, 
}}
//Copies the data of one coin into another
const feeObjCopy = (other) => {return {
    fees : {
        lowFee : other.fees.lowFee,
        medFee : other.fees.medFee,
        highFee: other.fees.highFee,
    },
    hrFeeSum : other.hrFeeSum,
    hrFeeCount : other.hrFeeCount,
    hrFeeAvg: other.hrFeeAvg,
    price: other.price, 
}}
const feeDataConstructor = () => {
    for(let i = 0; i < CoinNamesList.length; i++){
        FeeData[CoinNamesList[i]] = feeDataSchema();
    }
}
feeDataConstructor();

function feeGetCoinData(coinName){
    const data = feeObjCopy(FeeData[coinName]);
    return data;
}

function feeSetCoinFees(coinName, fees){
    const coinObject = FeeData[coinName];
    if(coinObject){
        coinObject.fees = fees;
    } else {
        return "Error no such coin"
    }
}

function feeSetCoinPrice(coinName, price){
    const coinObject = FeeData[coinName];
    if(coinObject){
        coinObject.price = Number(price);
    } else {
        return "Error no such coin"
    }  
}

function feeIncreaseHrFeeSum(coinName, amount){
    const coinObject = FeeData[coinName];
    if(coinObject){
        coinObject.hrFeeSum += Number(amount);
        coinObject.hrFeeCount ++;
    } else {
        return "Error no such coin"
    }  
}

function feeSetCoinAverage(coinName){
    let coinData = FeeData[coinName]
    if(!coinData) return;
    if( coinData.hrFeeCount != 0 ){
       let avg =  coinData.hrFeeSum / coinData.hrFeeCount;
       FeeData[coinName].hrFeeSum = 0;
       FeeData[coinName].hrFeeCount = 0;
       FeeData[coinName].hrFeeAvg = avg;
       return;
    }    
}

function feeSetAverages(){
    for(let i = 0 ; i < CoinNamesList.length; i ++){
        coinName = CoinNamesList[i];
        feeSetCoinAverage(coinName);
    }
}


/******************************************************************************************
 * @description Data regarding image urls and metadata on the coin for the Gasfee Table
 * This metadata also includes what socket.io updates to listen for
 * 
 * For now metadata will be inputed by hand, and so only getter methods are required
 * Methods required to load in the metadata for particular coins
 */
const MetaData = {
    Coins : {
        "Eth" : {
            logoLink : "/EthLogo.png",
            logoDesc : "Ethereum Logo",
            name : "Ethereum",
            socketEvent: "EthUpdate",
            key : 1,
        },
        "Bnb" :  {
            logoLink: "/BnbLogo.png",
            logoDesc : "Binance Coin Logo",
            name : "Binance Coin",
            socketEvent: "BnbUpdate",
            key: 2,
          },
        "Ftm" : {
            logoLink: "/FtmLogo.png",
            logoDesc : "Fantom Logo",
            name : "Fantom",
            socketEvent: "FtmUpdate",
            key: 3,
          },
        "Matic" : {
            logoLink: "/MaticLogo.png",
            logoDesc : "Matic Logo",
            name : "Matic",
            socketEvent: "MaticUpdate",
            key: 4,
        
          },
        "Sol" : {
            logoLink: "/SolLogo.png",
            logoDesc : "Solano Logo",
            name : "Solana",
            socketEvent: "SolUpdate",
            key: 2,
        
          },
        "Car" : {
            logoLink: "/CarLogo.png",
            logoDesc : "Cardano Logo",
            name : "Cardano",
            socketEvent: "CarUpdate",
            key: 3,
        
          },
        "Icp" : {
            logoLink: "/IcpLogo.png",
            logoDesc : "Internet Computer Logo",
            name : "Internet Computer",
            socketEvent: "IcpUpdate",
            key: 4,
          },
        "Dot" : {
            logoLink: "/DotLogo.png",
            logoDesc : "Polkadot Logo",
            name : "Polkadot",
            socketEvent: "DotUpdate",
            key: 5,
          },
    }
};



function getCoinMetaData(coinName){
    const data = MetaData.Coins[coinName];
    return data;
}



/**
 * Crude unit tests 
 */
function test(){
    //getCoinNames() Test 1
    let names = coinsGetAll();
    names[0] = "Monkey"
    if(coinsGetAll()[0] != "Eth")
        console.log("getCoinNames() Test 1 failed");

    let feeTest = feeGetCoinData("Bnb");
    feeTest.price = 100000;
    if(feeGetCoinData("Bnb").price != -1)
        console.log("getCoinFeeData() Test 1 failed");

    if(feeTest.price != 100000)
        console.log("getCoinFeeData() Test 2 failed");

    feeSetCoinFees("Sol", {lowFee: 10, medFee: 10, highFee:10})
    let test2Result = feeSetCoinFees("Solasola", {lowFee: 10, medFee: 10, highFee:10})

    if(feeGetCoinData("Sol").fees.medFee != 10)
        console.log("feeSetCoinFees() Test 1 failed");
    
    if(test2Result != "Error no such coin")
        console.log("feeSetCoinFees() Test 2 failed");

    feeIncreaseHrFeeSum("Eth", 100);
    feeIncreaseHrFeeSum("Eth", 200);
    feeIncreaseHrFeeSum("Eth", 300);
    if(feeGetCoinData("Eth").hrFeeSum != 600)
        console.log("feeIncreaseHrFeeSum() Test 1 Failed");
    if(feeGetCoinData("Eth").hrFeeCount != 3 )
        console.log("feeIncreaseHrFeeSum() Test 2 Failed");
    
    feeSetCoinAverage("Eth");
    if(feeGetCoinData("Eth").hrFeeSum != 0)
        console.log("feeIncreaseHrFeeSum() Test 1 Failed");
    if(feeGetCoinData("Eth").hrFeeCount != 0 )
        console.log("feeIncreaseHrFeeSum() Test 2 Failed");
    if(feeGetCoinData("Eth").hrFeeAvg != 200 )
        console.log("feeIncreaseHrFeeSum() Test 3 Failed");

    console.log("All (other) Tests Ran Successfully")
    
}

const DatabaseMethods = {
    //Methods relating to the GasFee Table
    GasFees : {
        Fees :{
            getCoin : feeGetCoinData, //Gets all $ data on the coin
            setCoinFees : feeSetCoinFees, //Gets fee obj for a coin
            setCoinPrice : feeSetCoinPrice, 
            increaseHrFeeSum : feeIncreaseHrFeeSum, //Increses the sum and count to calculate avg
            setCoinAverage : feeSetCoinAverage, //Calcs avg using count and sum, resets both to 0
            setAverages : feeSetAverages, //Calcs averages of all coins
        },

        MetaData : {
            getCoin : getCoinMetaData, //Returns Image URLS and metadata for a coin
        }

    },
    //List of Coins In use
    CoinNames : {
        getAll : coinsGetAll,

    }
}




module.exports = DatabaseMethods;
