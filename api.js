module.exports = {

    async getNewEtherPrice(){
        try {
            const apiKey = process.env.ETHERKEY;
            const response = await axios.get(`https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${apiKey}`);
            let newGasPrice = response.data.result.ProposeGasPrice;
            console.log(`New Gas Fee is : ${newGasPrice}`);
            etherGasFee = newGasPrice;

        } catch (error) {
            console.log(error);
        }
    },

}


