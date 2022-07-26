const axios = require('axios');
require('dotenv').config();
/** FILE DESCRIPTION
 * This file contains code to aquire current gas fees from Etherscan and other equivelant API's
 * These functions are called by a bot to update our "Database"
 * If we ever decide to move the Bot to a different server/process/onto the cloud
 * these functions will go along with it
 */

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
            const response = await axios.get(`https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${process.env.ETHERKEY}`);
            EtherFees.medFee = response.data.result.ProposeGasPrice;            
            EtherFees.lowFee = response.data.result.SafeGasPrice;
            EtherFees.highFee = response.data.result.FastGasPrice;
            return EtherFees;

        } catch (error) {
            console.log(error);
            return "Error"
        }
    },
     async getNewBnbFees(){
        try {
            let BnbFees = {
                lowFee : -1,
                medFee : -1,
                highFee: -1,
            }
            //const apiKey = SCIB192RJ6MGPDZVX8YDS48H1PXBZ99GK6;
            const response = await axios.get(`https://api.bscscan.com/api?module=gastracker&action=gasoracle&apikey=${process.env.BNBKEY}`);
            BnbFees.medFee = response.data.result.ProposeGasPrice;            
            BnbFees.lowFee = response.data.result.SafeGasPrice;
            BnbFees.highFee = response.data.result.FastGasPrice;
            return BnbFees;
        } catch (error) {
            console.log(error);
            return "Error"
        }
    },
     async getNewFtmFees(){
        try {
            let FtmFees = {
                lowFee : -1,
                medFee : -1,
                highFee: -1,
            }
            //const apiKey = RY3HP44ZY1HTS1EYPX4YV3HZSA9X8RBWW5;
            const response = await axios.get(`https://api.ftmscan.com/api?module=gastracker&action=gasoracle&apikey=${process.env.FTMKEY}`);
            FtmFees.medFee = response.data.result.ProposeGasPrice;            
            FtmFees.lowFee = response.data.result.SafeGasPrice;
            FtmFees.highFee = response.data.result.FastGasPrice;
            return FtmFees;

        } catch (error) {
            console.log(error);
            return "Error"
        }
    },
    async getNewMaticFees(){
        try {
            let MaticFees = {
                lowFee : -1,
                medFee : -1,
                highFee: -1,
            }
            //const apiKey = 3FI5JZZAYWEKYSY342E9AHNRJYPK7YE449
            const response = await axios.get(`https://api.polygonscan.com/api?module=gastracker&action=gasoracle&apikey=${process.env.MATICKEY}`);
            MaticFees.medFee = response.data.result.ProposeGasPrice;            
            MaticFees.lowFee = response.data.result.SafeGasPrice;
            MaticFees.highFee = response.data.result.FastGasPrice;
            return MaticFees;

        } catch (error) {
            console.log(error);
            return "Error"
        }
    },
    async getNewAvaxFees(){
        try {
            let AvaxFees = {
                lowFee : -1,
                medFee : -1,
                highFee: -1,
            }
            const response = await axios.get(`https://gavax.blockscan.com/gasapi.ashx?apikey=key&method=gasoracle`);
            AvaxFees.medFee = response.data.result.ProposeGasPrice;
            AvaxFees.lowFee = response.data.result.SafeGasPrice;
            AvaxFees.highFee = response.data.result.FastGasPrice;
            //also has a price function if you want
            return AvaxFees;

        } catch (error) {
            console.log(error);
            return "Error"
        }
     },

      async getNewMovrFees(){
        try {
            let MovrFees = {
                lowFee : -1,
                medFee : -1,
                highFee: -1,
            }
            const response = await axios.get(`https://gmriver.blockscan.com/gasapi.ashx?apikey=key&method=gasoracle`);
            MovrFees.medFee = response.data.result.ProposeGasPrice;
            MovrFees.lowFee = response.data.result.SafeGasPrice;
            MovrFees.highFee = response.data.result.FastGasPrice;
            //also has a price function if you want
            return MovrFees;

        } catch (error) {
            console.log(error);
            return "Error"
        }
  },

}


