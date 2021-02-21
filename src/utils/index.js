const contractAddress = 'TRCkjNzmikzmwUKB7dvmrxBF4z6sFBGijX'

const utils = {
    tronWeb: false,
    contract: false,

    async setTronWeb(tronWeb) {
        this.tronWeb = tronWeb;
        this.contract = await tronWeb.contract().at(contractAddress)
    },

};

export default utils;