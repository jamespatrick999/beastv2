const contractAddress = 'TGpEDDF975B94dZygGAA7zxHTZuj8W3KK5'

const utils = {
    tronWeb: false,
    contract: false,

    async setTronWeb(tronWeb) {
        this.tronWeb = tronWeb;
        this.contract = await tronWeb.contract().at(contractAddress)
    },
};

export default utils;