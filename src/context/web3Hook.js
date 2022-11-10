import { useState } from 'react';
import Web3Modal from 'web3modal';
import Web3 from 'web3';
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import { providers } from 'ethers';
import { toast } from 'react-toastify';
import { config, ABI } from '../config';
import { isEmpty, parseErrorMsg } from '../utils';

let web3Modal;
if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: true,
    providerOptions: {
      binancechainwallet: {
        package: true,
      },
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: config.INFURA_ID,
          rpc: {
            56: config.RPC_URL,
          },
        },
      },
      coinbasewallet: {
        package: CoinbaseWalletSDK,
        options: {
          appName: "Coinbase",
          infuraId: config.INFURA_ID,
          chainId: 56
        },
      },
    }, // required
    theme: "dark",
  });
}

export const useSigningWeb3Client = () => {
  const [web3, setWeb3] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pending, setPending] = useState(false);
  const [chainID, setChainID] = useState(0);
  const [walletAddress, setWalletAddress] = useState('');
  const [balance, setBalance] = useState({
    BNB: 0,
    BUSD: 0,
    ETR: 0
  })

  const loadWeb3 = async () => {
    try {
      const client = new Web3(config.RPC_URL);
      setWeb3(client);
    } catch (error) {
      console.log('[loadWeb3 Error] => ', error);
    }
  }

  const connectWallet = async () => {
    try {
      const provider = await web3Modal.connect();
      const client = new Web3(provider);
      setWeb3(client);
      const newProvider = new providers.Web3Provider(provider);
      await checkNetwork(newProvider);
      const accounts = await client.eth.getAccounts();
      localStorage.setItem('address', accounts[0]);
      setWalletAddress(accounts[0]);

      provider.on("accountsChanged", async function (accounts) {
        if (accounts[0] !== undefined) {
          setWalletAddress(accounts[0]);
        } else {
          setWalletAddress('');
        }
        await updateBalances();
      });

      provider.on('chainChanged', async function (chainId) {
        setChainID(chainId);
        await updateBalances();
      });

      provider.on('disconnect', function (error) {
        setWalletAddress('');
        setBalance({
          BNB: 0,
          BUSD: 0,
          ETR: 0
        })
      });
    } catch (error) {
      console.log('[connectWallet Error] => ', error);
    }
  }

  const disconnect = async () => {
    await web3Modal.clearCachedProvider();
    const client = new Web3(config.mainNetUrl);
    setWeb3(client);
    localStorage.removeItem("address");
    setChainID('');
    setWalletAddress('');
    setBalance({
      BNB: 0,
      BUSD: 0,
      ETR: 0
    });
  }

  const checkNetwork = async (web3Provider) => {
    if (!web3 || !web3Provider) return false;
    const network = await web3Provider.getNetwork();
    setChainID(network.chainID);
    if (web3.utils.toHex(network.chainID) !== web3.utils.toHex(config.CHAIN_ID)) {
      await changeNetwork();
      return false;
    } else {
      return true;
    }
  }

  const changeNetwork = async () => {
    if (!web3) return;
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: web3.utils.toHex(config.CHAIN_ID) }],
      });
    }
    catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: web3.utils.toHex(config.CHAIN_ID),
                chainName: 'BSC',
                rpcUrls: [config.RPC_URL] /* ... */,
              },
            ],
          });
          return {
            success: true,
            message: "switching succeed"
          }
        } catch (addError) {
          return {
            success: false,
            message: "Switching failed." + addError.message
          }
        }
      }
    }
  }

  const updateBalances = async () => {
    if (!web3) return;
    setLoading(true);
    try {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length === 0) return;
      let bnbBalance = await web3.eth.getBalance(accounts[0]);
      bnbBalance = web3.utils.fromWei(bnbBalance);

      const busdContract = new web3.eth.Contract(ABI.BUSD, config.BUSD_CONTRACT);
      let busdBalance = await busdContract.methods.balanceOf(accounts[0]).call();
      busdBalance = web3.utils.fromWei(busdBalance);

      const etrContract = new web3.eth.Contract(ABI.ETR, config.ETR_CONTRACT);
      let etrBalance = await etrContract.methods.balanceOf(accounts[0]).call();
      etrBalance = web3.utils.fromWei(etrBalance);

      setBalance({
        BNB: bnbBalance,
        BUSD: busdBalance,
        ETR: etrBalance
      })
    } catch (error) {
      console.log('[updateBalances Error] => ', error);
    }
    setLoading(false);
  }

  const getTotalPresaleAmount = async () => {
    if (!web3) return { success: false };
    try {
      const etrContract = new web3.eth.Contract(ABI.ETR, config.ETR_CONTRACT);
      let presaleAmount = await etrContract.methods.balanceOf(config.PRESALE_FACTORY).call();
      presaleAmount = web3.utils.fromWei(presaleAmount);
      return {
        success: true,
        presaleAmount
      }
    } catch (error) {
      console.log('[getTotalPresaleAmount Error] = ', error);
      return {
        success: false,
      }
    }
  }

  const getMaxPresaleCap = async () => {
    if (!web3) return { success: false }
    try {
      const PresaleContract = new web3.eth.Contract(ABI.PRESALE, config.PRESALE_FACTORY);
      let maxCap = await PresaleContract.methods.maxCapBUSD().call();
      maxCap = web3.utils.fromWei(maxCap);
      return {
        success: true,
        maxCap
      }
    } catch (error) {
      console.log('[MAX Error] = ', error);
      return {
        success: false
      }
    }
  }

  const getMinPresaleCap = async () => {
    if (!web3) return { success: false }
    try {
      const PresaleContract = new web3.eth.Contract(ABI.PRESALE, config.PRESALE_FACTORY);
      let minCap = await PresaleContract.methods.minCapBUSD().call();
      minCap = web3.utils.fromWei(minCap);
      return {
        success: true,
        minCap
      }
    } catch (error) {
      console.log('[MIN Error] = ', error);
      return {
        success: false
      }
    }
  }


  const getStartPresaleTime = async () => {
    if (!web3) return { success: false }
    try {
      const PresaleContract = new web3.eth.Contract(ABI.PRESALE, config.PRESALE_FACTORY);
      let start_time = await PresaleContract.methods.start_time().call();
      return {
        success: true,
        start_time
      }
    } catch (error) {
      console.log('[START Error] = ', error);
      return {
        success: false
      }
    }
  }

  const getEndPresaleTime = async () => {
    if (!web3) return { success: false }
    try {
      const PresaleContract = new web3.eth.Contract(ABI.PRESALE, config.PRESALE_FACTORY);
      let end_time = await PresaleContract.methods.end_time().call();
      return {
        success: true,
        end_time
      }
    } catch (error) {
      console.log('[END Error] = ', error);
      return {
        success: false
      }
    }
  }

  const getpTokenPriceForBUSD = async () => {
    if (!web3) return { success: false }
    try {
      const PresaleContract = new web3.eth.Contract(ABI.PRESALE, config.PRESALE_FACTORY);
      let busdPrice = await PresaleContract.methods.pTokenPrice_BUSD().call();
      busdPrice = web3.utils.fromWei(busdPrice);
      return {
        success: true,
        busdPrice
      }
    } catch (error) {
      console.log('[BUSD Error] = ', error);
      return {
        success: false
      }
    }
  }

  const getBNBForBUSD = async (amountOut) => {
    if (!web3) return { success: false }
    if (isEmpty(amountOut) || amountOut === 0) return { success: true, value: 0 }
    try {
      const path = [];
      path.push(config.WBNB_CONTRACT);
      path.push(config.BUSD_CONTRACT);
      const bscContract = new web3.eth.Contract(ABI.ROUTER, config.ROUTER_CONTRACT);
      let amountIn = await bscContract.methods.getAmountsIn(web3.utils.toWei(amountOut.toString()), path).call();
      return {
        success: true,
        value: web3.utils.fromWei(amountIn[0])
      }
    } catch (error) {
      console.log('[BNB For BUSD Error] = ', error);
      return {
        success: false
      }
    }
  }

  const getBUSDForBNB = async (amountIn) => {
    if (!web3) return { success: false }
    if (isEmpty(amountIn) || amountIn === 0) return { success: true, value: 0 }
    try {
      const path = [];
      path.push(config.WBNB_CONTRACT);
      path.push(config.BUSD_CONTRACT);
      const bscContract = new web3.eth.Contract(ABI.ROUTER, config.ROUTER_CONTRACT);
      let amountOut = await bscContract.methods.getAmountsOut(web3.utils.toWei(amountIn.toString()), path).call();
      return {
        success: true,
        value: web3.utils.fromWei(amountOut[amountOut.length - 1])
      }
    } catch (error) {
      console.log('[BUSD For BNB Error] = ', error);
      return {
        success: false
      }
    }
  }

  const getUserPaidBUSD = async () => {
    if (!web3) return { success: false }
    try {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length === 0) return { success: false }
      const PresaleContract = new web3.eth.Contract(ABI.PRESALE, config.PRESALE_FACTORY);
      let paidBUSD = await PresaleContract.methods.getUserPaidBUSD().call({ from: accounts[0] });
      paidBUSD = web3.utils.fromWei(paidBUSD);
      return {
        success: true,
        paidBUSD
      }
    } catch (error) {
      console.log('[BUSD Error] = ', error);
      return {
        success: false
      }
    }
  }

  const buy_pToken = async (coinAmount, tokenAmount, coinType) => {
    if (!web3) return { success: false }
    setPending(true);
    try {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length === 0) return { success: false }
      const PresaleContract = new web3.eth.Contract(ABI.PRESALE, config.PRESALE_FACTORY);
      coinAmount = web3.utils.toWei(coinAmount.toString());
      tokenAmount = web3.utils.toWei(tokenAmount.toString());

      if (coinType === 0) {
        const buyTokens = PresaleContract.methods.buyTokensByBNB();
        await buyTokens.estimateGas({ from: accounts[0], value: coinAmount });
        await PresaleContract.methods.buyTokensByBNB().send({ from: accounts[0], value: coinAmount });
      } else {
        const UsdcContract = new web3.eth.Contract(ABI.BUSD, config.BUSD_CONTRACT);
        await UsdcContract.methods.approve(config.PRESALE_FACTORY, coinAmount).send({ from: accounts[0] });
        const buyTokens = PresaleContract.methods.buyTokensByBUSD(coinAmount);
        await buyTokens.estimateGas({ from: accounts[0] });
        await PresaleContract.methods.buyTokensByBUSD(coinAmount).send({ from: accounts[0] });
      }

      await updateBalances();
      setPending(false);

      return {
        success: true
      }
    } catch (error) {
      console.log('[BUY Error] = ', error);
      toast.error(parseErrorMsg(error?.message));
    }
    setPending(false);
    return {
      success: false
    }
  }

  const setPresaleStartTime = async (_time) => {
    if (!web3) return { success: false }
    try {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length === 0) return { success: false }
      const PresaleContract = new web3.eth.Contract(ABI.PRESALE, config.PRESALE_FACTORY);
      const startTime = PresaleContract.methods.setStartTime(_time);
      await startTime.estimateGas({ from: accounts[0] });
      await PresaleContract.methods.setStartTime(_time).send({ from: accounts[0] });
      return {
        success: true
      }
    } catch (error) {
      toast.error(parseErrorMsg(error?.message));
      return {
        success: false
      }
    }
  }

  const setPresaleEndTime = async (_time) => {
    if (!web3) return { success: false }
    try {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length === 0) return { success: false }
      const PresaleContract = new web3.eth.Contract(ABI.PRESALE, config.PRESALE_FACTORY);
      const estimate = PresaleContract.methods.setEndTime(_time);
      await estimate.estimateGas({ from: accounts[0] });
      await PresaleContract.methods.setEndTime(_time).send({ from: accounts[0] });
      return {
        success: true
      }
    } catch (error) {
      toast.error(parseErrorMsg(error?.message));
      return {
        success: false
      }
    }
  }

  const setFeesOnNormalTransfer = async (enabled) => {
    if (!web3) return { success: false }
    try {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length === 0) return { success: false }
      const MagicContract = new web3.eth.Contract(ABI.ETR, config.ETR_CONTRACT);
      const estimate = MagicContract.methods.setFeesOnNormalTransfers(enabled);
      await estimate.estimateGas({ from: accounts[0] });
      console.log(enabled)
      await MagicContract.methods.setFeesOnNormalTransfers(enabled).send({ from: accounts[0] });
      return {
        success: true
      }
    } catch (error) {
      toast.error(parseErrorMsg(error?.message));
      return {
        success: false
      }
    }
  }

  const setInitialDistributionFinished = async (enalbed) => {
    if (!web3) return { success: false }
    try {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length === 0) return { success: false }
      const MagicContract = new web3.eth.Contract(ABI.ETR, config.ETR_CONTRACT);
      const estimate = MagicContract.methods.setInitialDistributionFinished(enalbed);
      await estimate.estimateGas({ from: accounts[0] });
      await MagicContract.methods.setInitialDistributionFinished(enalbed).send({ from: accounts[0] });
      return {
        success: true
      }
    } catch (error) {
      toast.error(parseErrorMsg(error?.message));
      return {
        success: false
      }
    }
  }

  const setMaxCap = async (_maxCap) => {
    if (!web3) return { success: false }
    try {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length === 0) return { success: false }
      const PresaleContract = new web3.eth.Contract(ABI.PRESALE, config.PRESALE_FACTORY);
      const maxCap = web3.utils.toWei(_maxCap.toString());
      console.log('[Max Cap]', maxCap);
      const estimate = PresaleContract.methods.setMaxCapBUSD(maxCap);
      await estimate.estimateGas({ from: accounts[0] });
      await PresaleContract.methods.setMaxCapBUSD(maxCap).send({ from: accounts[0] });
      return {
        success: true
      }
    } catch (error) {
      toast.error(parseErrorMsg(error?.message));
      return {
        success: false
      }
    }
  }

  const setMinCap = async (_minCap) => {
    if (!web3) return { success: false }
    try {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length === 0) return { success: false }
      const PresaleContract = new web3.eth.Contract(ABI.PRESALE, config.PRESALE_FACTORY);
      const minCap = web3.utils.toWei(_minCap.toString());
      const estimate = PresaleContract.methods.setMinCapBUSD(minCap);
      await estimate.estimateGas({ from: accounts[0] });
      await PresaleContract.methods.setMinCapBUSD(minCap).send({ from: accounts[0] });
      return {
        success: true
      }
    } catch (error) {
      toast.error(parseErrorMsg(error?.message));
      return {
        success: false
      }
    }
  }

  const setFeeReceivers = async (data) => {
    if (!web3) return { success: false }
    try {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length === 0) return { success: false }
      const MagicContract = new web3.eth.Contract(ABI.ETR, config.ETR_CONTRACT);
      const estimate = MagicContract.methods.setFeeReceivers(data.liquidity_receiver, data.treasury_receiver, data.risk_free_value_receiver, data.operation_receiver, data.x_magic_receiver, data.future_ecosystem_receiver, data.burn_receiver);
      await estimate.estimateGas({ from: accounts[0] });
      await MagicContract.methods.setFeeReceivers(data.liquidity_receiver, data.treasury_receiver, data.risk_free_value_receiver, data.operation_receiver, data.x_magic_receiver, data.future_ecosystem_receiver, data.burn_receiver).send({ from: accounts[0] });
      return {
        success: true
      }
    } catch (error) {
      console.log(error)
      toast.error(parseErrorMsg(error?.message));
      return {
        success: false
      }
    }
  }


  const setFees = async (data) => {
    if (!web3) return { success: false }
    try {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length === 0) return { success: false }
      const MagicContract = new web3.eth.Contract(ABI.ETR, config.ETR_CONTRACT);
      const estimate = MagicContract.methods.setFees(data.fee_kind, data.total, data.liquidity_fee, data.risk_free_value_fee, data.treasury_fee, data.fee_fee, data.operation_fee, data.x_magic_fee, data.burn_fee);
      await estimate.estimateGas({ from: accounts[0] });
      await MagicContract.methods.setFees(data.fee_kind, data.total, data.liquidity_fee, data.risk_free_value_fee, data.treasury_fee, data.fee_fee, data.operation_fee, data.x_magic_fee, data.burn_fee).send({ from: accounts[0] });
      return {
        success: true
      }
    } catch (error) {
      console.log(error)
      toast.error(parseErrorMsg(error?.message));
      return {
        success: false
      }
    }
  }

  const getETRPriceInWeb3 = async () => {
    if (!web3) return { success: false }
    try {
      // const path = [];
      // path.push(config.ETR_CONTRACT);
      // path.push(config.WBNB_CONTRACT);
      // path.push(config.BUSD_CONTRACT);
      // const from_decimal = 'ether';
      // const to_decimal = 'mwei';
      // const bscContract = new web3.eth.Contract(ABI.ROUTER, config.ROUTER_CONTRACT);
      // let amountOut = await bscContract.methods.getAmountsOut(web3.utils.toWei('1', from_decimal), path).call();
      return {
        success: true,
        ETRPrice: 0.07 // web3.utils.fromWei(amountOut[amountOut.length - 1], to_decimal)
      }
    } catch (error) {
      console.log('[BUSD Error] = ', error);
      return {
        success: false
      }
    }
  }

  const getRebaseFrequency = async () => {
    if (!web3) return { success: false }
    try {
      const MagicContract = new web3.eth.Contract(ABI.ETR, config.ETR_CONTRACT);
      let rebaseFrequency = await MagicContract.methods.rebaseFrequency().call();
      return {
        success: true,
        rebaseFrequency
      }
    } catch (error) {
      return {
        success: false
      }
    }
  }

  const getNextRebase = async () => {
    if (!web3) return { success: false }
    try {
      const MagicContract = new web3.eth.Contract(ABI.ETR, config.ETR_CONTRACT);
      let nextRebase = await MagicContract.methods.nextRebase().call();
      return {
        success: true,
        nextRebase
      }
    } catch (error) {
      console.log('[Next] = ', error);
      return {
        success: false
      }
    }
  }

  const getMarketCap = async (magicPrice) => {
    if (!web3) return { success: false }
    try {
      const MagicContract = new web3.eth.Contract(ABI.ETR, config.ETR_CONTRACT);
      let supply = await MagicContract.methods.getCirculatingSupply().call();
      supply = web3.utils.fromWei(supply);
      const marketCap = supply * magicPrice;
      return {
        success: true,
        marketCap
      }
    } catch (error) {
      console.log('[MarketCap] = ', error);
      return {
        success: false
      }
    }
  }

  const getTotalEarned = async () => {
    if (!web3) return { success: false }
    try {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length === 0) return { success: false }
      const MagicContract = new web3.eth.Contract(ABI.ETR, config.ETR_CONTRACT);
      let initialBalance = await MagicContract.methods.initialBalanceOf(accounts[0]).call();
      initialBalance = web3.utils.fromWei(initialBalance);
      let totalBalance = await MagicContract.methods.balanceOf(accounts[0]).call();
      totalBalance = web3.utils.fromWei(totalBalance);
      const total_earned = 0; // Number(totalBalance) - Number(initialBalance);
      const earned_rate = 0; // Number(initialBalance) <= 0 ? 0 : total_earned * 100 / Number(initialBalance);
      return {
        success: true,
        total_earned,
        earned_rate
      }
    } catch (error) {
      console.log('[Total Earned] = ', error);
      return {
        success: false
      }
    }
  }

  return {
    web3,
    loading,
    pending,
    chainID,
    walletAddress,
    balance,

    loadWeb3,
    connectWallet,
    disconnect,
    checkNetwork,
    updateBalances,

    getTotalPresaleAmount,
    getMaxPresaleCap,
    getMinPresaleCap,
    getStartPresaleTime,
    getEndPresaleTime,
    getpTokenPriceForBUSD,
    getBNBForBUSD,
    getBUSDForBNB,
    getUserPaidBUSD,
    getETRPriceInWeb3,
    getRebaseFrequency,
    getNextRebase,
    getMarketCap,
    getTotalEarned,

    buy_pToken,

    setPresaleStartTime,
    setPresaleEndTime,
    setFeesOnNormalTransfer,
    setInitialDistributionFinished,
    setMaxCap,
    setMinCap,
    setFeeReceivers,
    setFees
  }
}