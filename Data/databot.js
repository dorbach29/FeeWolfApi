const api = require('./fees')
const priceApi = require('./coinPrices')
const Database = require("./data").GasFees.Fees;
const CoinNames = require("./data").CoinNames.getAll();


module.exports = {
    
    self : -1, //Reference to this object
    running : false,
    apiIntervals : [], //Can be used to stop application

    /**
     * !Call before accessing any data/starting any bots
     * This is used to initialize any dependent values such as self and currData
     * A schema for currData is defined in this method
     */
    config(){
        self = this;  
    },
    
    /**
     * Starts pulling the data dynamically
     * Returns false if the bot is already running
     */
    start(){
        if(!self.running){
            console.log("Bot.start() has been called and ran")
            self.running = true;
            setInterval(this.setNewEtherFees, 3000);
            setInterval(this.setNewBnbFees, 3000);
            setInterval(this.setNewFtmFees, 3000);
            setInterval(this.setNewMaticFees, 3000);
            setInterval(Database.setAverages,   2 *  60 * 1000); //Calculates average fees for all coins
            setInterval(this.setCoinPrices, 1 * 10 * 1000)
            setInterval(this.logData, 1*5*1000);
            return true;
        }
        return false;
    },


    /**
     *  This function should be used to get the bots data on any particular coin
     * @param {String} coinName - Ex: "Eth" "Sol"
     * @returns {Fees, hrFeeAvg, Price} retObject
     */
    getCoinData(coinName){
        return Database.getCoin(coinName);
    },

    /**
     * Updates the new ether fees on currData (Eth.lowFee Eth.medFee Eth.highFee)
     * To be called by bots in order to keep data updated
     */
    async setNewEtherFees(){
        try{
            let newEtherFees = await api.getNewEtherFees();
            Database.setCoinFees("Eth", newEtherFees);
            Database.increaseHrFeeSum("Eth" , newEtherFees.medFee);
        } catch (error){
            console.log(error);
        }
    },

    async setNewBnbFees(){
        try{
            let newBnbFees = await api.getNewBnbFees();
            Database.setCoinFees("Bnb", newBnbFees);
            Database.increaseHrFeeSum("Bnb" , newBnbFees.medFee);
        } catch(error){
            console.log(error);
        }
    },
  
    async setNewFtmFees(){
        try{
            let newFtmFees = await api.getNewFtmFees();
            Database.setCoinFees("Ftm", newFtmFees);
            Database.increaseHrFeeSum("Ftm" , newFtmFees.medFee);
            //console.log("FTM");
            //console.log(newFtmFees);
        } catch(error){
            console.log(error);
        }
    },
  
    async setNewMaticFees(){
        try{
            let newMaticFees = await api.getNewMaticFees();
            Database.setCoinFees("Matic", newMaticFees);
            Database.increaseHrFeeSum("Matic" , newMaticFees.medFee);
        } catch (error){
            console.log(error);
        }
    },

    async setCoinPrices(){
        try {
            let prices = await priceApi.getCoinPrices();
            for(let i = 0 ; i < CoinNames.length; i ++){
                let coin = CoinNames[i]; 
                Database.setCoinPrice(coin, prices[coin])
            }
        } catch (error){
            console.log(error);
        }
    },


   logData(){
       for(let i = 0; i < CoinNames.length; i ++){
           let coin = CoinNames[i];
           console.log(Database.getCoin(coin));
       }
   }
} 
