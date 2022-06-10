const api = require('./Fees')

module.exports = {
    
    //Object containing the data that this bot updates
    currData : {
        Eth :  {
            lowFee : -1,
            medFee : -1,
            highFee: -1,
            price: -1, 
            hrFee: -1,
        },
        Sol :  {
            lowFee : -1,
            medFee : -1,
            highFee: -1,
            price: -1, 
            hrFee: -1,
        },
        Car :  {
            lowFee : -1,
            medFee : -1,
            highFee: -1,
            price: -1, 
            hrFee: -1,
        },
        Ftm :  {
            lowFee : -1,
            medFee : -1,
            highFee: -1,
            price: -1, 
            hrFee: -1,
        },
        Bnb :  {
            lowFee : -1,
            medFee : -1,
            highFee: -1,
            price: -1, 
            hrFee: -1,
        },
        Matic :  {
            lowFee : -1,
            medFee : -1,
            highFee: -1,
            price: -1, 
            hrFee: -1,
        }
    },

   


    /**
     * !Call before accessing any data/starting any bots
     * This is used to initialize a pointer to itself to be used instead of this
     */
    self : -1,
    config(){
        self = this;
    },
    
    /**
     * Starts updating the different gas fees
     */
    start(){
        setInterval(this.setNewEtherFees, 3000);
        setInterval(this.setNewBnbFees, 3000);
        setInterval(this.setNewFtmFees, 3000);
        setInterval(this.setNewMaticFees, 3000);
    },


    /**
     * Updates the new ether fees on currData (Eth.lowFee Eth.medFee Eth.highFee)
     * To be called by bots in order to keep data updated
     */
    async setNewEtherFees(){
        try{
            let newEtherFees = await api.getNewEtherFees();
            self.currData.Eth.lowFee = newEtherFees.lowFee;
            self.currData.Eth.medFee = newEtherFees.medFee;
            self.currData.Eth.highFee = newEtherFees.highFee;
            console.log("Eth");
            console.log(newEtherFees)
        } catch (error){
            console.log(error);
        }
    },

    async setNewBnbFees(){
        try{
            let newBnbFees = await api.getNewBnbFees();
            self.currData.Bnb.lowFee = newBnbFees.lowFee;
            self.currData.Bnb.medFee = newBnbFees.medFee;
            self.currData.Bnb.highFee = newBnbFees.highFee;
            console.log("BNB");
            console.log(newBnbFees);
        } catch(error){
            console.log(error);
        }
    },
    async setNewFtmFees(){
        try{
            let newFtmFees = await api.getNewFtmFees();
            self.currData.Ftm.lowFee = newFtmFees.lowFee;
            self.currData.Ftm.medFee = newFtmFees.medFee;
            self.currData.Ftm.highFee = newFtmFees.highFee;
            console.log("FTM");
            console.log(newFtmFees);
        } catch(error){
            console.log(error);
        }
    },
    async setNewMaticFees(){
        try{
            let newMaticFees = await api.getNewMaticFees();
            self.currData.Matic.lowFee = newMaticFees.lowFee;
            self.currData.Matic.medFee = newMaticFees.medFee;
            self.currData.Matic.highFee = newMaticFees.highFee;
            console.log("Matic");
            console.log(newMaticFees)
        } catch (error){
            console.log(error);
        }
    },
}