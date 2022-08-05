/** FILE DESCRIPTION
 *  This file will eventually handle all methods needed for querying the database
 *  For now data is simply stored in memory (This file) and so the methods reflect that
 */

const exchangeNameList = ["Coinbase", "Gemeni"];

function exchangeGetAll(){
    return [...exchangeNameList];
}

const ExchangeData = {};


//Functions go here

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
        
        
    }
};