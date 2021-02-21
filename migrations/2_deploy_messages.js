var TronBeastv2 = artifacts.require("./TronBeastv2.sol");
module.exports = function (deployer) {
  deployer.deploy(TronBeastv2,
    "TQ9nCgHVgki3KjXUnC5Vdm3bcuNTQ4EVMY",
    "TQ9nCgHVgki3KjXUnC5Vdm3bcuNTQ4EVMY",
    "TQ9nCgHVgki3KjXUnC5Vdm3bcuNTQ4EVMY",
    "TJEDMQLLkGC3frpSnEhJes8fTWHPpQ5C6P"
  );
};
