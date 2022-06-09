const axios = require('axios');
require('dotenv').config();

/** Functions should return an object 
 * * lowFee : Number - the current low priority price of the coin
 * * medFee : Number - the current med priority of the coin
 * * highFee Number - the current high priority of the coin
 */
module.exports = {

    /**
     * Returns ethereum gas fees from etherscan
     * @returns {lowFee, medFee, highFee} 
     */
    async getNewEtherFees(){
        try {
            let EtherFees = {
                lowFee : -1,
                medFee : -1,
                highFee: -1,
            }
            const apiKey = process.env.ETHERKEY;
            const response = await axios.get(`https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${apiKey}`);
            EtherFees.medFee = response.data.result.ProposeGasPrice;            
            EtherFees.lowFee = response.data.result.SafeGasPrice;
            EtherFees.highFee = response.data.result.FastGasPrice;
            return EtherFees;

        } catch (error) {
            console.log(error);
            return "Error"
        }
    },
    
    
    

}


