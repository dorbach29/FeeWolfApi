/** FILE DESCRIPTION
 *  This file will eventually handle all methods needed for querying the database
 *  For now data is simply stored in memory (This file) and so the methods reflect that
 */


const exchangeNameList = ["Coinbase", "Gemeni", "Kucoin", "Binance", "Crypto.com", "FTX" ];

function exchangeGetAll(){
    return [...exchangeNameList];
}

const ExchangeData = {};
const exchangeDataSchema= () => {return {
    fee : {
        transactionFee : -1,
    },
}}
const exchangeObjCopy = (other) => {return {
    fee : {
        transactionFee : other.fee.transactionFee,
    },

}}

const exchangeDataConstructor = () => {
    for(let i = 0; i < exchangeNameList.length; i++){
        ExchangeData[exchangeNameList[i]] = exchangeDataSchema();
    }

}
exchangeDataConstructor();
//Functions go here
function getExchangeData(exchangeName){
    const data = exchangeObjCopy(ExchangeData[exchangeName]);
    return data;
}

function exchangeSetFees(exchangeName, fee){
    const exchangeObject = FeeData[exchangeName];
    if(exchangeObject){
        exchangeName.fee = fee;
    } else {
        return "Exchange does not exist";
    }
}


//Functions end here
const ExchangeMetaData = {
    Exchanges : {
        "Coinbase" : {
            logoLink : "/Coinbase.png",
            logoDesc : "Coinbase Logo",
            name : "Coinbase",
            withdrawlFee : -1,
        },
        "Gemeni" :  {
            logoLink : "/Gemeni.png",
            logoDesc : "Gemeni Logo",
            name : "Gemeni",
            withdrawlFee : -1,
          },
        "Kucoin" : {
            logoLink : "/Kucoin.png",
            logoDesc : "Kucoin Logo",
            name: "Kucoin",
            withdrawlFee : -1,
        },
        "Binance" : {
            logoLink : "/Binance.png",
            logoDesc : "Binance Logo",
            name: "Binance",
            withdrawlFee : -1,
        },
        "Crypto.com" : {
            logoLink : "/CryptoCom.png",
            logoDesc : "Crypto.com Logo",
            name: "Crypto.com",
            withdrawlFee : -1,
        },
        "FTX" : {
            logoLink : "/FTX.png",
            logoDesc : "FTX Logo",
            name: "FTX",
            withdrawlFee : -1,
        },
        
        
    }
};

function getExchangeMetaData(exchangeName){
    const data = ExchangeMetaData.Exchanges[exchangeName];
    return data;
}

const ExchangeDatabaseMethods = {
    ExchangeFees : {
        TransactionFee:{
            getExchange : getExchangeData,
            setExchangeFee : exchangeSetFees,
        },
    },
    ExchangeMetaData: {
        getExchangeMeta : getExchangeMetaData,
    },
    ExchangeNames : {
        getAll : exchangeGetAll,
    }
}

module.exports = ExchangeDatabaseMethods;

