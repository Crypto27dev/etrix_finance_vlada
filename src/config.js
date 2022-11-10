const presale = require('./abi/presale.json');
const etr = require('./abi/etr.json');
const busd = require('./abi/busd.json');
const router = require('./abi/router.json');

export const config = {
  CHAIN_ID: 56,                                                   // 97
  RPC_URL: 'https://bsc-dataseed.binance.org/',                   // https://data-seed-prebsc-1-s1.binance.org:8545/
  INFURA_ID: 'e6943dcb5b0f495eb96a1c34e0d1493e',                  //            Test net
  ETR_CONTRACT: '0x43e9841f03bAA0bEd9245A8C72e63c8B78F773D4',     // 0xee37E665A0a03e6E0b1305E887bDDAE7CF3255cd
  BUSD_CONTRACT: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',    // 0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee
  PRESALE_FACTORY: '0x79afB43218031dd05AC1082223fc9aFb1aE09FDf',  // 0xe87eB70bEA83312C521C42e92C3EC28BfC77c74B
  ROUTER_CONTRACT: '0x1Ed675D5e63314B760162A3D1Cae1803DCFC87C7',  // 0x1Ed675D5e63314B760162A3D1Cae1803DCFC87C7
  WBNB_CONTRACT: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'     // 0xae13d989dac2f0debff460ac112a837c89baa7cd
}

export const ABI = {
  PRESALE: presale,
  ETR: etr,
  BUSD: busd,
  ROUTER: router,
}

export const def_config = {
  REBASE_RATE: 0.00067,
  DPR: 1.6303075,
  APY: 365.0011023,
  SWAP_FEE: 0.053,
  AUTO_SLIPPAGE: 1,
  DAILY_CLAIM: 1,
  BUY_FEE: 0.13,
  SELL_FEE: 0.2,
  DEF_PRICE: 0.11,
  ETR_DIGIT: 2,
  MAX_PRESALE_AMOUNT: 10000000
}