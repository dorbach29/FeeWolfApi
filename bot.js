const api = require('./Fees')

const CoinNames = ["Eth" , "Car", "Sol", "Dot", "Icp"];
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
            setInterval(this.setNewEtherFees, 5 * 1000); //Gets ethereum fees
            setInterval(this.calcAverages,  5 * 60 * 1000); //Calculates average fees for all coins
            return true;
        }
        return false;
    },


    /**
     * Updates the new ether fees on currData (Eth.lowFee Eth.medFee Eth.highFee)
     * To be called by bots in order to keep data updated
     */
    async setNewEtherFees(){
        try{
            let newEtherFees = await api.getNewEtherFees();
            self.currData.Eth.fees = newEtherFees;
            self.currData.Eth.hrFeeSum += Number(newEtherFees.medFee)
            self.currData.Eth.hrFeeCount += 1;
            console.log(self.currData.Eth.fees)
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
           return;
        }        
    },

    //Calculates the average for all coins using calculateAverage helper function
   calcAverages(){
        for(let i = 0 ; i < CoinNames.length ; i ++){
            self.calculateAverage(CoinNames[i]);
        }
   }
} 