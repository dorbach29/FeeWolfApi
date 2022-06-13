const api = require('./Fees')
const priceApi = require('./CoinPrices')
const CoinNames = require("./CoinNames")
const DataSchema = () => {return {
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

module.exports = {
    
    currData : {}, //Object where coinData is held. Schema defined in congig method
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
        //Initializes currData to containe the full list of coins
        for(let i = 0; i < CoinNames.length; i++){
            self.currData[CoinNames[i]] = DataSchema();
        }
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
            setInterval(this.calcAverages,   2 *  60 * 1000); //Calculates average fees for all coins
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
        const retObject = {
            fees : {

            }
        };
        retObject.fees.lowFee = Number(self.currData[coinName].fees.lowFee);
        retObject.fees.medFee = Number(self.currData[coinName].fees.medFee);
        retObject.fees.highFee = Number(self.currData[coinName].fees.highFee);
        retObject.hrFeeAvg = self.currData[coinName].hrFeeAvg;
        retObject.price = self.currData[coinName].price; 
        return retObject;
    },

    /**
     * Returns list of current coins in use
     */
    getCoinList(){
        return CoinNames;
    },

    /**
     * Updates the new ether fees on currData (Eth.lowFee Eth.medFee Eth.highFee)
     * To be called by bots in order to keep data updated
     */
    async setNewEtherFees(){
        try{
            let newEtherFees = await api.getNewEtherFees();
            self.currData.Eth.fees = newEtherFees;
            self.currData.Eth.hrFeeSum += Number(newEtherFees.medFee);
            self.currData.Eth.hrFeeCount += 1;
            //console.log("ETH");
            //console.log(self.currData.Eth.fees)
        } catch (error){
            console.log(error);
        }
    },

    async setNewBnbFees(){
        try{
            let newBnbFees = await api.getNewBnbFees();
            self.currData.Bnb.fees = newBnbFees;
            self.currData.Bnb.hrFeeSum += Number(newBnbFees.medFee);
            self.currData.Bnb.hrFeeCount += 1;
           // console.log("BNB");
            //console.log(newBnbFees);
        } catch(error){
            console.log(error);
        }
    },
  
    async setNewFtmFees(){
        try{
            let newFtmFees = await api.getNewFtmFees();
            self.currData.Ftm.fees = newFtmFees;
            self.currData.Ftm.hrFeeSum += Number(newFtmFees.medFee);
            self.currData.Ftm.hrFeeCount += 1;
            //console.log("FTM");
            //console.log(newFtmFees);
        } catch(error){
            console.log(error);
        }
    },
  
    async setNewMaticFees(){
        try{
            let newMaticFees = await api.getNewMaticFees();
            self.currData.Matic.fees = newMaticFees;
            self.currData.Matic.hrFeeSum += Number(newMaticFees.medFee);
            self.currData.Matic.hrFeeCount += 1;
            //console.log("Matic");
            //console.log(newMaticFees)
        } catch (error){
            console.log(error);
        }
    },

    async setCoinPrices(){
        try {
            let prices = await priceApi.getCoinPrices();
            for(let i = 0 ; i < CoinNames.length; i ++){
                let coin = CoinNames[i]; 
                self.currData[coin].price = prices[coin];
            }
        } catch (error){
            console.log(error);
        }
    },

    //Runs the computations nessecary to find the average price for a coin
    calculateAverage(coinName){
        let coinData = self.currData[coinName]
        if( coinData.hrFeeCount != 0 ){
           let avg =  coinData.hrFeeSum / coinData.hrFeeCount;
           self.currData[coinName].hrFeeSum = 0;
           self.currData[coinName].hrFeeCount = 0;
           self.currData[coinName].hrFeeAvg = avg;
           //console.log(coinName);
           //console.log(self.currData[coinName].hrFeeAvg);
           return;
        }        
    },

    //Calculates the average for all coins using calculateAverage helper function
   calcAverages(){
        for(let i = 0 ; i < CoinNames.length ; i ++){
            self.calculateAverage(CoinNames[i]);
        }
   },

   logData(){
       for(let i = 0; i < CoinNames.length; i ++){
           let coin = CoinNames[i];
           console.log(coin);
           console.log(self.currData[coin]);
       }
   }
} 
