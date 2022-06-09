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
        Dot :  {
            lowFee : -1,
            medFee : -1,
            highFee: -1,
            price: -1, 
            hrFee: -1,
        },
        Icp :  {
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
            //console.log(newEtherFees)
        } catch (error){
            console.log(error);
        }
    }
}